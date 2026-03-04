"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

// --- Contact Mini (homepage) ---

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis (min 2 caractères)"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Message trop court (min 10 caractères)"),
});

export type ContactFormState = {
  success: boolean;
  errors: Record<string, string[]> | null;
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from("contacts").insert({
    nom: result.data.name,
    email: result.data.email,
    commentaire: result.data.message,
    source: "mini",
  });

  if (error) {
    console.error("Supabase insert error (mini):", error);
    return {
      success: false,
      errors: { _form: ["Erreur serveur. Veuillez réessayer."] },
    };
  }

  return {
    success: true,
    errors: null,
    message: "Message envoyé avec succès !",
  };
}

// --- Contact Full (page contact) ---

const contactFullSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  sujets: z.string().optional(), // JSON array of selected sujets
  besoins: z.string().optional(), // JSON array of selected besoins
  commentaire: z.string().optional(),
});

export type ContactFullFormState = {
  success: boolean;
  errors: Record<string, string[]> | null;
  message?: string;
};

export async function submitContactFullForm(
  _prevState: ContactFullFormState,
  formData: FormData
): Promise<ContactFullFormState> {
  const values = {
    name: formData.get("name") as string,
    prenom: formData.get("prenom") as string,
    email: formData.get("email") as string,
    telephone: (formData.get("telephone") as string) || undefined,
    entreprise: (formData.get("entreprise") as string) || undefined,
    sujets: formData.get("sujets") as string,
    besoins: formData.get("besoins") as string,
    commentaire: (formData.get("commentaire") as string) || undefined,
  };

  const result = contactFullSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Parse JSON arrays
  let sujets: string[] = [];
  let besoins: string[] = [];
  try {
    if (result.data.sujets) sujets = JSON.parse(result.data.sujets);
    if (result.data.besoins) besoins = JSON.parse(result.data.besoins);
  } catch {
    // fallback: empty arrays
  }

  const { error } = await supabase.from("contacts").insert({
    nom: result.data.name,
    prenom: result.data.prenom,
    email: result.data.email,
    telephone: result.data.telephone || null,
    entreprise: result.data.entreprise || null,
    sujets,
    besoins,
    commentaire: result.data.commentaire || null,
    source: "full",
  });

  if (error) {
    console.error("Supabase insert error (full):", error);
    return {
      success: false,
      errors: { _form: ["Erreur serveur. Veuillez réessayer."] },
    };
  }

  return {
    success: true,
    errors: null,
    message: "Message envoyé ! Nous vous répondrons sous 24h.",
  };
}
