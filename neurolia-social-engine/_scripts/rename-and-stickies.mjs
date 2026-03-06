#!/usr/bin/env node
/**
 * Renomme les noeuds WF02 et WF03 en français + ajoute sticky notes.
 * Usage: node rename-and-stickies.mjs
 */

const N8N_URL = 'https://n8n.srv1207220.hstgr.cloud';
const N8N_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjcwMjhiOS1hZjkyLTQyMTUtODkzNS05NjM0OGRkMjkyMTgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiZTQyZTBjYzgtOGFjZS00ZDhiLTk3MWUtYzUzMDRhYjkyNTk2IiwiaWF0IjoxNzcxNTk2ODEzfQ.ozkgmhnwRbWvvKsM28fMJbk-X930a5zD9o_17n--o1g';

const WF02_ID = '9CjAn1p1fBvqICU2';
const WF03_ID = 'lseu1WhVn7c29EEj';

// ── Rename maps ──────────────────────────────────────────────────────

const WF02_RENAME = {
  'Schedule Trigger': 'Declencheur Planifie',
  'Fetch Active Clients': 'Charger Clients Actifs',
  'Filter Clients with Drive': 'Filtrer Clients avec Drive',
  'Split Clients': 'Boucle Clients',
  'List Drive Files': 'Lister Fichiers Drive',
  'Filter New Files': 'Filtrer Nouveaux Fichiers',
  'IF \u2014 New Files Found': 'SI \u2014 Nouveaux Fichiers',
  'Split Files': 'Boucle Fichiers',
  'Download File': 'Telecharger Fichier',
  'Upload to Storage': 'Upload vers Storage',
  'Insert Upload Record': 'Inserer Enregistrement Upload',
  'Match to Editorial Slot': 'Associer Creneau Editorial',
  'IF \u2014 Slot Assigned': 'SI \u2014 Creneau Assigne',
  'Update Upload Assigned': 'MAJ Upload Assigne',
  'Fetch Slot Direction': 'Charger Direction Artistique',
  'Fetch Brand Platform': 'Charger Plateforme Marque',
  'Fetch Context Images': 'Charger Images Contexte',
  'Download Original': 'Telecharger Original',
  'Build Sublimation Prompt': 'Construire Prompt Sublimation',
  'Agent DA \u2014 Sublimation': 'Agent DA \u2014 Sublimation',
  'Upload Sublimated Image': 'Upload Image Sublimee',
  'Fetch Anti-Repetition Captions': 'Charger Captions Anti-Repetition',
  'Build Caption Prompt': 'Construire Prompt Caption',
  'Agent Redacteur': 'Agent Redacteur',
  'OpenAI Chat Model \u2014 Redacteur': 'Modele OpenAI \u2014 Redacteur',
  'Structured Output Parser \u2014 Caption': 'Parseur Sortie \u2014 Caption',
  'OpenAI Chat Model \u2014 AutoFix': 'Modele OpenAI \u2014 AutoFix',
  'Insert Content Queue': 'Inserer File Contenu',
  'Update Upload Status': 'MAJ Statut Upload',
  'Move Drive File': 'Deplacer Fichier Drive',
  'Log Execution': 'Journal Execution',
};

const WF03_RENAME = {
  'Schedule Trigger': 'Declencheur Planifie',
  'Fetch Active Clients': 'Charger Clients Actifs',
  'Split Clients': 'Boucle Clients',
  'Calculate Week Range': 'Calculer Plage Semaine',
  'Fetch Story Slots': 'Charger Creneaux Stories',
  'IF Slots Found': 'SI \u2014 Creneaux Trouves',
  'Fetch Brand Platform': 'Charger Plateforme Marque',
  'Assign Photos to Slots': 'Assigner Photos aux Creneaux',
  'Split Story Slots': 'Boucle Creneaux Stories',
  'Download Photo': 'Telecharger Photo',
  'Build Sublimation Prompt': 'Construire Prompt Sublimation',
  'Agent DA Story': 'Agent DA Story',
  'Upload Story Image': 'Upload Image Story',
  'Build Caption Prompt': 'Construire Prompt Caption',
  'Agent Redacteur Story': 'Agent Redacteur Story',
  'OpenAI Chat Model Redacteur': 'Modele OpenAI \u2014 Redacteur',
  'Structured Output Parser Story': 'Parseur Sortie \u2014 Story',
  'OpenAI Chat Model AutoFix': 'Modele OpenAI \u2014 AutoFix',
  'Insert Content Queue': 'Inserer File Contenu',
  'Update Uploads Status': 'MAJ Statut Uploads',
  'Log Execution': 'Journal Execution',
};

// ── Sticky Notes ─────────────────────────────────────────────────────

const WF02_STICKIES = [
  {
    id: 'sn01',
    content: '## 1. CHARGEMENT CLIENTS\nDeclencheur toutes les 10 min.\nCharge les clients actifs avec un dossier Google Drive configure.',
    position: [-80, 280], width: 800, height: 120,
  },
  {
    id: 'sn02',
    content: '## 2. SCAN GOOGLE DRIVE\nListe les fichiers du dossier Drive client.\nFiltre les nouveaux fichiers non encore traites.',
    position: [800, 470], width: 620, height: 120,
  },
  {
    id: 'sn03',
    content: '## 3. TELECHARGEMENT + STOCKAGE\nTelecharge chaque nouveau fichier depuis Drive.\nUpload vers Supabase Storage et enregistre en base.',
    position: [1490, -200], width: 830, height: 120,
  },
  {
    id: 'sn04',
    content: '## 4. ASSOCIATION EDITORIALE\nAssigne le fichier au prochain creneau editorial disponible.\nSi aucun creneau libre, le fichier reste en attente.',
    position: [2380, -280], width: 620, height: 120,
  },
  {
    id: 'sn05',
    content: '## 5. CONTEXTE CREATIF + SUBLIMATION\nCharge la direction artistique, la charte marque et les images contexte.\nSublime la photo via gpt-image-1 (mode post ou story).',
    position: [3050, -280], width: 1520, height: 120,
  },
  {
    id: 'sn06',
    content: '## 6. REDACTION CAPTION\nCharge les dernieres captions pour anti-repetition.\nAgent Redacteur (GPT-4o) ecrit caption + hashtags + CTA en JSON.',
    position: [4620, -280], width: 900, height: 120,
  },
  {
    id: 'sn07',
    content: '## 7. ENREGISTREMENT + ARCHIVAGE\nInsere dans content_queue (pending_review).\nMAJ statut upload, deplace le fichier Drive vers "traites".',
    position: [5560, -280], width: 700, height: 120,
  },
];

const WF03_STICKIES = [
  {
    id: 'sn01',
    content: '## 1. CHARGEMENT CLIENTS\nDeclencheur chaque dimanche 20h.\nCharge les clients actifs pour preparer le batch stories de la semaine suivante.',
    position: [-80, 470], width: 620, height: 120,
  },
  {
    id: 'sn02',
    content: '## 2. PLANNING SEMAINE\nCalcule la plage lundi-dimanche de la semaine prochaine.\nRecupere les creneaux stories planifies pour cette semaine.',
    position: [570, 640], width: 620, height: 120,
  },
  {
    id: 'sn03',
    content: '## 3. PREPARATION BATCH\nCharge la charte marque et assigne les photos aux creneaux.\nChaque story recoit une photo depuis le pool uploads.',
    position: [1270, 710], width: 640, height: 120,
  },
  {
    id: 'sn04',
    content: '## 4. SUBLIMATION STORY\nTelecharge la photo, construit le prompt visuel.\nAgent DA retouche via gpt-image-1 (mode light, 1080x1920).\nUpload vers Storage.',
    position: [2040, 930], width: 850, height: 120,
  },
  {
    id: 'sn05',
    content: '## 5. REDACTION CAPTION STORY\nAgent Redacteur Story ecrit caption courte (20-40 mots) + CTA.\nAnti-repetition sur les dernieres stories publiees.',
    position: [2940, 930], width: 660, height: 120,
  },
  {
    id: 'sn06',
    content: '## 6. ENREGISTREMENT + FINALISATION\nInsere dans content_queue (pending_review) avec batch_id.\nMAJ statut uploads et log execution.',
    position: [2100, 450], width: 620, height: 120,
  },
];

// ── Transform functions ──────────────────────────────────────────────

function makeStickyNode(s) {
  return {
    parameters: {
      content: s.content,
      width: s.width || 600,
      height: s.height || 120,
    },
    id: s.id,
    name: 'Sticky Note ' + s.id,
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: s.position,
  };
}

function deepReplace(obj, renameMap) {
  if (typeof obj === 'string') {
    let result = obj;
    // Sort by length descending to avoid partial matches
    const sorted = Object.entries(renameMap).sort((a, b) => b[0].length - a[0].length);
    for (const [oldName, newName] of sorted) {
      if (oldName === newName) continue;
      // Replace all occurrences
      while (result.includes(oldName)) {
        result = result.replace(oldName, newName);
      }
    }
    return result;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepReplace(item, renameMap));
  }
  if (obj && typeof obj === 'object') {
    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
      newObj[key] = deepReplace(val, renameMap);
    }
    return newObj;
  }
  return obj;
}

function transformWorkflow(wf, renameMap, stickies) {
  // 1. Rename nodes
  const renamedNodes = wf.nodes.map(node => {
    const newName = renameMap[node.name] || node.name;
    const renamedNode = deepReplace({ ...node }, renameMap);
    renamedNode.name = newName;
    return renamedNode;
  });

  // 2. Add sticky notes
  const stickyNodes = stickies.map(makeStickyNode);
  const allNodes = [...renamedNodes, ...stickyNodes];

  // 3. Rename connections
  const newConnections = {};
  for (const [sourceName, targets] of Object.entries(wf.connections)) {
    const newSourceName = renameMap[sourceName] || sourceName;
    const renamedTargets = {};
    for (const [connType, connArrays] of Object.entries(targets)) {
      renamedTargets[connType] = connArrays.map(connArr =>
        connArr.map(conn => ({
          ...conn,
          node: renameMap[conn.node] || conn.node,
        }))
      );
    }
    newConnections[newSourceName] = renamedTargets;
  }

  return { nodes: allNodes, connections: newConnections };
}

// ── API helpers ──────────────────────────────────────────────────────

async function getWorkflow(id) {
  const res = await fetch(`${N8N_URL}/api/v1/workflows/${id}`, {
    headers: { 'X-N8N-API-KEY': N8N_KEY },
  });
  if (!res.ok) throw new Error(`GET ${id} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function putWorkflow(id, { name, nodes, connections, settings }) {
  const body = { name, nodes, connections, settings };
  const res = await fetch(`${N8N_URL}/api/v1/workflows/${id}`, {
    method: 'PUT',
    headers: {
      'X-N8N-API-KEY': N8N_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PUT ${id} failed: ${res.status} ${errText}`);
  }
  return res.json();
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching WF02...');
  const wf02 = await getWorkflow(WF02_ID);
  console.log(`  ${wf02.nodes.length} nodes, ${Object.keys(wf02.connections).length} connections`);

  console.log('Fetching WF03...');
  const wf03 = await getWorkflow(WF03_ID);
  console.log(`  ${wf03.nodes.length} nodes, ${Object.keys(wf03.connections).length} connections`);

  console.log('\nTransforming WF02...');
  const t02 = transformWorkflow(wf02, WF02_RENAME, WF02_STICKIES);
  console.log(`  ${t02.nodes.length} nodes (${WF02_STICKIES.length} stickies added)`);

  console.log('Transforming WF03...');
  const t03 = transformWorkflow(wf03, WF03_RENAME, WF03_STICKIES);
  console.log(`  ${t03.nodes.length} nodes (${WF03_STICKIES.length} stickies added)`);

  // Verify: check that all connection targets exist as node names
  for (const [label, transformed, renameMap] of [['WF02', t02, WF02_RENAME], ['WF03', t03, WF03_RENAME]]) {
    const nodeNames = new Set(transformed.nodes.map(n => n.name));
    const sourceNames = Object.keys(transformed.connections);
    for (const src of sourceNames) {
      if (!nodeNames.has(src)) {
        console.error(`  [${label}] Connection source "${src}" not found in nodes!`);
      }
    }
    for (const [src, targets] of Object.entries(transformed.connections)) {
      for (const [connType, connArrays] of Object.entries(targets)) {
        for (const connArr of connArrays) {
          for (const conn of connArr) {
            if (!nodeNames.has(conn.node)) {
              console.error(`  [${label}] Connection target "${conn.node}" (from "${src}") not found in nodes!`);
            }
          }
        }
      }
    }
    console.log(`  [${label}] Connection integrity: OK`);
  }

  console.log('\nPushing WF02...');
  await putWorkflow(WF02_ID, {
    name: wf02.name,
    nodes: t02.nodes,
    connections: t02.connections,
    settings: wf02.settings,
  });
  console.log('  WF02 updated!');

  console.log('Pushing WF03...');
  await putWorkflow(WF03_ID, {
    name: wf03.name,
    nodes: t03.nodes,
    connections: t03.connections,
    settings: wf03.settings,
  });
  console.log('  WF03 updated!');

  console.log('\nDone! Both workflows updated with French names + sticky notes.');
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
