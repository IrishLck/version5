
import React from "react";
import { Fenetre } from "../types";

type Props = {
  fenetres: Fenetre[];
  setFenetres: (f: Fenetre[]) => void;
  setFenetre: (f: Fenetre) => void;
};

export default function WindowList({ fenetres, setFenetres, setFenetre }: Props) {
  return (
    <div className="border rounded p-4 bg-white">
      <h3 className="font-semibold mb-2">Soumission</h3>
      {fenetres.map((f, i) => (
        <div key={f.id} className="border p-2 my-2">
          <strong>{f.nom}</strong> – {f.largeur}x{f.hauteur}
        </div>
      ))}
    </div>
  );
}
