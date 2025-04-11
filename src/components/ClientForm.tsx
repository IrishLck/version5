
import React, { useState } from "react";
import { Client, clientSchema } from "../types";
import { z } from "zod";
import { toast } from "react-hot-toast";

type Props = {
  client: Client;
  setClient: (client: Client) => void;
};

export default function ClientForm({ client, setClient }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof Client, string>>>({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (field: keyof Client, value: string) => {
    const next = { ...client, [field]: value };
    const result = clientSchema.safeParse(next);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors[field];
      setErrors((prev) => ({ ...prev, [field]: fieldError?.[0] || "" }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setClient(next);
  };

  const handleValidate = () => {
    const result = clientSchema.safeParse(client);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      const formattedErrors: Partial<Record<keyof Client, string>> = {};
      for (const key in fieldErrors) {
        formattedErrors[key as keyof Client] = fieldErrors[key]?.[0] || "";
      }
      setErrors(formattedErrors);
      setIsValid(false);
      toast.error("Certains champs sont invalides ❌");
    } else {
      setErrors({});
      setIsValid(true);
      toast.success("Formulaire client valide ✅");
    }
  };

  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Fiche client</h2>
      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(client) as (keyof Client)[]).map((field) => (
          <div key={field}>
            <input
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={client[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="border p-2 rounded w-full"
            />
            {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}
      </div>
      <button
        onClick={handleValidate}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow"
      >
        Valider le formulaire
      </button>
      {!isValid && (
        <p className="text-red-500 mt-2 text-sm">Certains champs sont invalides.</p>
      )}
    </div>
  );
}
