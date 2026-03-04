#!/usr/bin/env node
/**
 * lint-animations.js
 * Détecte les anti-patterns CSS/JS qui causent des saccades d'animation
 *
 * Usage: node scripts/lint-animations.js <fichier>
 *
 * Règles détectées:
 * - PERF001: filter: blur() animé (très coûteux)
 * - PERF002: transition: all (anime des propriétés non souhaitées)
 * - PERF003: Animation sur propriétés de layout (width/height/top/left/margin/padding)
 * - PERF004: will-change manquant sur éléments animés
 * - PERF005: Animations conflictuelles parent/enfant
 */

const fs = require('fs');
const path = require('path');

// Couleurs pour la sortie
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

/**
 * Règles de détection
 */
const RULES = {
  PERF001: {
    id: 'PERF001',
    severity: 'error',
    name: 'filter-blur-animated',
    message: 'filter: blur() animé - très coûteux en performance',
    fix: 'Supprimer le blur animé ou utiliser opacity seul'
  },
  PERF002: {
    id: 'PERF002',
    severity: 'warning',
    name: 'transition-all',
    message: 'transition: all - anime des propriétés non souhaitées',
    fix: 'Spécifier les propriétés: transition: transform 0.3s, opacity 0.3s'
  },
  PERF003: {
    id: 'PERF003',
    severity: 'error',
    name: 'layout-property-animated',
    message: 'Animation sur propriété de layout - cause des reflows',
    fix: 'Utiliser transform: translate() au lieu de top/left, scale() au lieu de width/height'
  },
  PERF004: {
    id: 'PERF004',
    severity: 'warning',
    name: 'missing-will-change',
    message: 'will-change manquant sur élément avec transition/animation complexe',
    fix: 'Ajouter will-change: transform, opacity (avec parcimonie)'
  },
  PERF005: {
    id: 'PERF005',
    severity: 'warning',
    name: 'conflicting-animations',
    message: 'Animation potentiellement conflictuelle (transition + animation sur même élément)',
    fix: 'Séparer les animations ou utiliser uniquement animation'
  }
};

/**
 * Analyse un fichier et retourne les violations
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const violations = [];
  const lines = content.split('\n');

  // Contexte pour l'analyse
  let currentSelector = null;
  let inKeyframes = false;
  let hasTransition = new Map(); // selector -> line
  let hasAnimation = new Map();  // selector -> line
  let hasWillChange = new Map(); // selector -> boolean

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmedLine = line.trim();

    // Détecter les sélecteurs CSS
    if (trimmedLine.match(/^[.#\w\[\]:,\s-]+\s*\{/) && !trimmedLine.includes('@')) {
      currentSelector = trimmedLine.replace(/\s*\{.*/, '').trim();
      inKeyframes = false;
    }

    // Détecter @keyframes
    if (trimmedLine.startsWith('@keyframes')) {
      inKeyframes = true;
      currentSelector = trimmedLine;
    }

    // Fin de bloc
    if (trimmedLine === '}') {
      if (!inKeyframes) currentSelector = null;
      if (trimmedLine === '}' && inKeyframes && !line.startsWith(' ')) {
        inKeyframes = false;
      }
    }

    // PERF001: filter: blur() dans transition ou animation
    if (trimmedLine.includes('filter:') && trimmedLine.includes('blur')) {
      // Vérifier si c'est animé (dans un keyframe ou avec transition)
      if (inKeyframes || hasTransition.has(currentSelector)) {
        violations.push({
          rule: RULES.PERF001,
          line: lineNum,
          column: line.indexOf('filter'),
          context: trimmedLine,
          selector: currentSelector
        });
      }
    }

    // PERF002: transition: all
    if (trimmedLine.match(/transition\s*:\s*all\b/)) {
      violations.push({
        rule: RULES.PERF002,
        line: lineNum,
        column: line.indexOf('transition'),
        context: trimmedLine,
        selector: currentSelector
      });
      if (currentSelector) hasTransition.set(currentSelector, lineNum);
    }

    // Tracker les transitions
    if (trimmedLine.match(/transition\s*:/) && currentSelector) {
      hasTransition.set(currentSelector, lineNum);
    }

    // Tracker les animations
    if (trimmedLine.match(/animation\s*:/) && currentSelector) {
      hasAnimation.set(currentSelector, lineNum);
    }

    // Tracker will-change
    if (trimmedLine.match(/will-change\s*:/) && currentSelector) {
      hasWillChange.set(currentSelector, true);
    }

    // PERF003: Animation sur propriétés de layout
    const layoutProps = ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding'];
    if (inKeyframes) {
      for (const prop of layoutProps) {
        const regex = new RegExp(`\\b${prop}\\s*:`);
        if (trimmedLine.match(regex)) {
          violations.push({
            rule: RULES.PERF003,
            line: lineNum,
            column: line.indexOf(prop),
            context: trimmedLine,
            selector: currentSelector,
            property: prop
          });
        }
      }
    }
  });

  // PERF004: Vérifier will-change manquant (après analyse complète)
  // Seulement pour les éléments avec transition sur filter ou plusieurs propriétés
  for (const [selector, lineNum] of hasTransition) {
    if (!hasWillChange.has(selector)) {
      // Vérifier si c'est une animation complexe (filter, transform + opacity, etc.)
      const selectorLines = content.split(selector)[1]?.split('}')[0] || '';
      if (selectorLines.includes('filter:') ||
          (selectorLines.includes('transform') && selectorLines.includes('opacity'))) {
        violations.push({
          rule: RULES.PERF004,
          line: lineNum,
          column: 0,
          context: `${selector} { ... }`,
          selector: selector
        });
      }
    }
  }

  // PERF005: Conflits transition + animation sur même sélecteur
  for (const [selector, transitionLine] of hasTransition) {
    if (hasAnimation.has(selector)) {
      violations.push({
        rule: RULES.PERF005,
        line: transitionLine,
        column: 0,
        context: `${selector} a transition (ligne ${transitionLine}) ET animation (ligne ${hasAnimation.get(selector)})`,
        selector: selector
      });
    }
  }

  return violations;
}

/**
 * Formate le rapport de violations
 */
function formatReport(filePath, violations) {
  if (violations.length === 0) {
    return `${GREEN}✓${RESET} ${path.basename(filePath)}: Aucun problème d'animation détecté`;
  }

  const errors = violations.filter(v => v.rule.severity === 'error');
  const warnings = violations.filter(v => v.rule.severity === 'warning');

  let output = `\n${BOLD}${path.basename(filePath)}${RESET}\n`;

  for (const v of violations) {
    const icon = v.rule.severity === 'error' ? `${RED}✗${RESET}` : `${YELLOW}⚠${RESET}`;
    const color = v.rule.severity === 'error' ? RED : YELLOW;

    output += `  ${icon} Ligne ${v.line}: ${color}${v.rule.id}${RESET} - ${v.rule.message}\n`;
    output += `    ${v.context}\n`;
    output += `    💡 Fix: ${v.rule.fix}\n\n`;
  }

  output += `\n${RED}${errors.length} erreur(s)${RESET}, ${YELLOW}${warnings.length} warning(s)${RESET}\n`;

  return output;
}

/**
 * Point d'entrée
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node lint-animations.js <fichier.css|.html>');
    process.exit(0);
  }

  const filePath = args[0];

  // Vérifier que le fichier existe
  if (!fs.existsSync(filePath)) {
    console.error(`${RED}Erreur: Fichier non trouvé: ${filePath}${RESET}`);
    process.exit(1);
  }

  // Vérifier l'extension
  const ext = path.extname(filePath).toLowerCase();
  if (!['.css', '.html', '.htm', '.scss', '.vue', '.jsx', '.tsx'].includes(ext)) {
    // Fichier non concerné, sortie silencieuse
    process.exit(0);
  }

  const violations = analyzeFile(filePath);
  const report = formatReport(filePath, violations);

  console.log(report);

  // Exit code basé sur les erreurs
  const hasErrors = violations.some(v => v.rule.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
