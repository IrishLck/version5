
import React, { useState } from "react";
import { Fenetre, fenetreSchema } from "../types";
import { toast } from "react-hot-toast";

type Props = {
  fenetre: Fenetre;
  setFenetre: (f: Fenetre) => void;
  fabricants: string[];
  produitsParFabricant: Record<string, string[]>;
  tissus: string[];
  couleurs: string[];
  controles: string[];
  fractions: string[];
  mecanismesParFabricant: Record<string, string[]>;
  moteurs: string[];
  cassettes: string[];
  ajouterFenetre: () => void;
};

export default function WindowForm({ fenetre, setFenetre, fabricants, produitsParFabricant, tissus, couleurs, controles, fractions, mecanismesParFabricant, moteurs, cassettes, ajouterFenetre }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof Fenetre, string>>>({});
  const [isValid, setIsValid] = useState(true);

  const handleValidate = () => {
    const result = fenetreSchema.safeParse(fenetre);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      const formattedErrors: Partial<Record<keyof Fenetre, string>> = {};
      for (const key in fieldErrors) {
        formattedErrors[key as keyof Fenetre] = fieldErrors[key]?.[0] || "";
      }
      setErrors(formattedErrors);
      setIsValid(false);
      toast.error("Champs invalides dans la fenêtre ❌");
    } else {
      setErrors({});
      setIsValid(true);
      toast.success("Fenêtre valide ✅");
    }
  };

  const handleChange = (field: keyof Fenetre, value: any) => {
    setFenetre({ ...fenetre, [field]: value });
  };

  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Nouvelle Fenêtre</h2>
      <input placeholder="Nom" value={fenetre.nom} onChange={(e) => handleChange("nom", e.target.value)} className="border p-2 mb-2 w-full" />
      {errors.nom && <p className="text-red-600 text-sm">{errors.nom}</p>}
      <button onClick={handleValidate} className="bg-green-600 text-white px-4 py-2 rounded">Valider la fenêtre</button>
      <button onClick={() => {
        const result = fenetreSchema.safeParse(fenetre);
        if (!result.success) {
          toast.error("Veuillez valider la fenêtre avant l'ajout ❗");
        } else {
          ajouterFenetre();
        }
      }} className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">Ajouter la fenêtre</button>
    </div>
  );
}
