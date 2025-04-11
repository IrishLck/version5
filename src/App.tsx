import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Client, Fenetre, clientSchema, fenetreSchema } from "./types";
import { validerAvantSoumission } from "./types";

export default function App() {
  const [client, setClient] = useState<Client>({
    nom: "", prenom: "", telephone: "", courriel: "", adresse: "", ville: ""
  });

  const [fenetre, setFenetre] = useState<Fenetre>({
    nom: "", fabricant: "", produit: "", tissu: "", couleur: "", largeur: "", largeurFraction: "0/8",
    hauteur: "", hauteurFraction: "0/8", controle: "", mecanisme: "", moteur: "", poseInterieure: false,
    poseMurale: false, inverse: false, cassette: "", couleurCassette: "",
    prixListe: 0, coutant: 0, prixVente: 0, quantite: 1
  });

  const [fenetres, setFenetres] = useState<Fenetre[]>([]);
  const [prixParProduit, setPrixParProduit] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const combinaisons = [
      ["faber", "butler"],
      ["faber", "solopaque"],
      ["altex", "altex-a"],
      ["altex", "altex-b"]
      // Ajouter d'autres fabricants/produits ici si nécessaire
    ];
    combinaisons.forEach(([fabricant, produit]) => {
      const cle = `${fabricant}-${produit}`;
      fetch(`/data/prix-${cle}.csv`)
        .then(res => res.text())
        .then(csv => {
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              setPrixParProduit(prev => ({
                ...prev,
                [cle]: result.data as any[]
              }));
            }
          });
        });
    });
  }, []);

  const ajouterFenetre = () => {
    const largeur = parseInt(fenetre.largeur);
    const hauteur = parseInt(fenetre.hauteur);
    const cleProduit = `${fenetre.fabricant.toLowerCase()}-${fenetre.produit.toLowerCase().replaceAll(" ", "-")}`;

    const key = `${largeur}x${hauteur}`;
    const liste = prixParProduit[cleProduit] || [];
    const match = liste.find(p => parseInt(p.Largeur) === largeur && parseInt(p.Hauteur) === hauteur);

    let prixBase = 100;
    if (match) prixBase = parseFloat(match.Prix);

    const prixListe = prixBase * 1.1;
    const coutant = prixListe * 0.3;
    const prixVente = prixListe * 0.47;
    const quantite = fenetre.quantite || 1;

    setFenetres([...fenetres, {
      ...fenetre,
      id: Date.now(),
      prixListe,
      coutant,
      prixVente,
      largeurArr: largeur,
      hauteurArr: hauteur,
      key,
      quantite
    }]);

    setFenetre({
      nom: "", fabricant: "", produit: "", tissu: "", couleur: "", largeur: "", largeurFraction: "0/8",
      hauteur: "", hauteurFraction: "0/8", controle: "", mecanisme: "", moteur: "", poseInterieure: false,
      poseMurale: false, inverse: false, cassette: "", couleurCassette: "",
      prixListe: 0, coutant: 0, prixVente: 0, quantite: 1
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Lestoriste</h1>
      <button
        onClick={() => validerAvantSoumission(client, fenetres)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >Soumettre la soumission</button>
    </div>
  );
}
