
import { z } from "zod";
import { toast } from "react-hot-toast";

export interface Client {
  nom: string;
  prenom: string;
  telephone: string;
  courriel: string;
  adresse: string;
  ville: string;
}

export const clientSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  telephone: z.string().min(8, "Téléphone invalide"),
  courriel: z.string().email("Courriel invalide"),
  adresse: z.string().min(1, "Adresse requise"),
  ville: z.string().min(1, "Ville requise")
});

export interface Fenetre {
  id?: number;
  nom: string;
  fabricant: string;
  produit: string;
  tissu: string;
  couleur: string;
  largeur: string;
  largeurFraction: string;
  hauteur: string;
  hauteurFraction: string;
  controle: string;
  mecanisme: string;
  moteur: string;
  poseInterieure: boolean;
  poseMurale: boolean;
  inverse: boolean;
  cassette: string;
  couleurCassette: string;
  prixListe: number;
  coutant: number;
  prixVente: number;
  quantite?: number;
}

export const fenetreSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  fabricant: z.string().min(1, "Fabricant requis"),
  produit: z.string().min(1, "Produit requis"),
  tissu: z.string().min(1, "Tissu requis"),
  couleur: z.string().min(1, "Couleur requise"),
  largeur: z.string().min(1, "Largeur requise"),
  largeurFraction: z.string(),
  hauteur: z.string().min(1, "Hauteur requise"),
  hauteurFraction: z.string(),
  controle: z.string().min(1, "Contrôle requis"),
  mecanisme: z.string().min(1, "Système requis"),
  moteur: z.string().optional(),
  poseInterieure: z.boolean(),
  poseMurale: z.boolean(),
  inverse: z.boolean(),
  cassette: z.string(),
  couleurCassette: z.string(),
  prixListe: z.number(),
  coutant: z.number(),
  prixVente: z.number(),
  quantite: z.number().optional()
});

export function validerAvantSoumission(client: Client, fenetres: Fenetre[]): boolean {
  const clientValid = clientSchema.safeParse(client);
  if (!clientValid.success) {
    toast.error("Informations client invalides ❌");
    return false;
  }
  for (const f of fenetres) {
    const validF = fenetreSchema.safeParse(f);
    if (!validF.success) {
      toast.error(`Fenêtre invalide : "${f.nom || "sans nom"}" ❌`);
      return false;
    }
  }
  toast.success("Client + fenêtres valides ✅");
  return true;
}
