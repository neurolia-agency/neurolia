"use client";

import { useEffect, useState, useCallback } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  submitContactFullForm,
  type ContactFullFormState,
} from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * CONTACT FORM - "THE DIALOGUE"
 *
 * Both "Type de projet" and "Votre besoin" are multi-select chip groups.
 * Selections are sent as JSON arrays to Supabase.
 * The textarea is a free-form optional "Commentaire" field.
 */

const formSchema = z.object({
  name: z.string().min(2, "Nom requis (min 2 caractères)"),
  prenom: z.string().min(2, "Prénom requis (min 2 caractères)"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  commentaire: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const sujetOptions = [
  { value: "site-vitrine", label: "Site vitrine" },
  { value: "automatisation", label: "Automatisation" },
  { value: "conseil", label: "Conseil / Audit" },
  { value: "autre", label: "Autre" },
];

const besoinOptions = [
  { value: "site-qui-convertit", label: "Un site qui convertit" },
  { value: "site-vieillissant", label: "Moderniser mon site" },
  { value: "automatiser", label: "Automatiser des tâches" },
];

export default function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const [selectedSujets, setSelectedSujets] = useState<string[]>([]);
  const [selectedBesoins, setSelectedBesoins] = useState<string[]>([]);

  const [state, formAction] = useFormState<ContactFullFormState, FormData>(
    submitContactFullForm,
    { success: false, errors: null }
  );

  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      prenom: "",
      email: "",
      telephone: "",
      entreprise: "",
      commentaire: "",
    },
  });

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
    }
  }, [state.success, state.message]);

  const toggleSujet = useCallback((value: string) => {
    setSelectedSujets((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }, []);

  const toggleBesoin = useCallback((value: string) => {
    setSelectedBesoins((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }, []);

  const inputClasses =
    "w-full px-0 py-2.5 bg-transparent border-0 border-b border-[rgba(245,245,245,0.1)] text-[#737373] text-[0.7rem] placeholder:text-[0.7rem] placeholder:text-[#525252] focus:text-[#D4D4D4] focus:border-[#C45C3B] focus:ring-0 transition-colors duration-300 rounded-none";

  const chipBase =
    "text-[11px] px-2.5 py-1.5 border transition-all duration-300 cursor-pointer select-none font-medium";
  const chipActive =
    "border-[#C45C3B] bg-[rgba(196,92,59,0.15)] text-[#F5F5F5]";
  const chipInactive =
    "border-[rgba(196,92,59,0.25)] text-[#A3A3A3] hover:border-[#C45C3B] hover:bg-[rgba(196,92,59,0.06)] hover:text-[#D4D4D4]";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div
        className="relative p-5 md:p-8 lg:p-10 border border-[rgba(245,245,245,0.06)]"
        style={{ backgroundColor: "rgba(5,8,16,0.8)" }}
      >
        {/* Corner accent — Neurolia DNA */}
        <div className="absolute top-0 left-0 w-6 h-[3px] bg-[#C45C3B]" />
        <div className="absolute top-0 left-0 w-[3px] h-6 bg-[#C45C3B]" />

        {/* Time estimate */}
        <div className="flex items-center justify-center gap-2 mb-5 text-[11px] text-[#737373] tracking-wide">
          <svg
            className="w-3.5 h-3.5 text-[#525252]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWidth={1.5}
              d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          2 minutes pour remplir le formulaire
        </div>

        <form action={formAction} className="space-y-4">
          {/* Hidden fields: sujets + besoins as JSON */}
          <input
            type="hidden"
            name="sujets"
            value={JSON.stringify(selectedSujets)}
          />
          <input
            type="hidden"
            name="besoins"
            value={JSON.stringify(selectedBesoins)}
          />

          {/* Nom + Prénom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-1"
              >
                Nom <span className="text-[#C45C3B]">*</span>
              </label>
              <Input
                {...register("name")}
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom"
                aria-invalid={!!(state.errors?.name || errors.name)}
                className={inputClasses}
              />
              {(state.errors?.name || errors.name) && (
                <p className="text-[#F87171] text-xs mt-1">
                  {state.errors?.name?.[0] || errors.name?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="prenom"
                className="block text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-1"
              >
                Prénom <span className="text-[#C45C3B]">*</span>
              </label>
              <Input
                {...register("prenom")}
                id="prenom"
                name="prenom"
                type="text"
                placeholder="Votre prénom"
                aria-invalid={!!(state.errors?.prenom || errors.prenom)}
                className={inputClasses}
              />
              {(state.errors?.prenom || errors.prenom) && (
                <p className="text-[#F87171] text-xs mt-1">
                  {state.errors?.prenom?.[0] || errors.prenom?.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-1"
            >
              Email <span className="text-[#C45C3B]">*</span>
            </label>
            <Input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              aria-invalid={!!(state.errors?.email || errors.email)}
              className={inputClasses}
            />
            {(state.errors?.email || errors.email) && (
              <p className="text-[#F87171] text-xs mt-1">
                {state.errors?.email?.[0] || errors.email?.message}
              </p>
            )}
          </div>

          {/* Téléphone + Entreprise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <div>
              <label
                htmlFor="telephone"
                className="block text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-1"
              >
                Téléphone
              </label>
              <Input
                {...register("telephone")}
                id="telephone"
                name="telephone"
                type="tel"
                placeholder="06 12 34 56 78"
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="entreprise"
                className="block text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-1"
              >
                Entreprise
              </label>
              <Input
                {...register("entreprise")}
                id="entreprise"
                name="entreprise"
                type="text"
                placeholder="Votre entreprise"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Type de projet — multi-select chips */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-2.5">
              Type de projet
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sujetOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleSujet(option.value)}
                  className={`${chipBase} ${
                    selectedSujets.includes(option.value)
                      ? chipActive
                      : chipInactive
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Votre besoin — multi-select chips */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-2.5">
              Votre besoin
            </label>
            <div className="flex flex-wrap gap-1.5">
              {besoinOptions.map((option, i) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => toggleBesoin(option.value)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className={`${chipBase} ${
                    selectedBesoins.includes(option.value)
                      ? chipActive
                      : chipInactive
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Commentaire — free-form optional */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label
                htmlFor="commentaire"
                className="block text-[10px] uppercase tracking-[0.15em] text-[#737373]"
              >
                Commentaire
              </label>
              <span className="text-[10px] text-[#525252] tracking-wide">
                Facultatif
              </span>
            </div>
            <Textarea
              {...register("commentaire")}
              id="commentaire"
              name="commentaire"
              placeholder="Précisions, délais, budget..."
              rows={3}
              className={`${inputClasses} !px-3 resize-none`}
            />
          </div>

          {/* Submit */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="cta-pulse-btn group w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C45C3B] border border-[#C45C3B] hover:bg-[#D4683F] hover:border-[#D4683F]"
            >
              <span className="text-[11px] tracking-[0.1em] uppercase font-medium text-[#050810] transition-colors duration-300">
                Je demande à être rappelé
              </span>
              <svg
                className="w-3 h-3 text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="square"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-[#525252] tracking-wide">
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Données sécurisées
              </span>
              <span className="w-px h-2.5 bg-[#333]" />
              <span>Aucun spam</span>
              <span className="w-px h-2.5 bg-[#333]" />
              <span>Réponse sous 24h</span>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
