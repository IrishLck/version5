import React, { useState } from "react";
import ClientForm from "./components/ClientForm";
import WindowForm from "./components/WindowForm";
import WindowList from "./components/WindowList";
import NotesSection from "./components/NotesSection";
import { Client, Fenetre, validerAvantSoumission } from "./types";

const fabricants = ["Faber", "Altex", "Ambiance Déco", "Persienne Design", "Sol-r"];
const produitsParFabricant = {
  Faber: ["Butler", "Solopaque"],
  Altex: ["Altex A", "Altex B"],
  "Ambiance Déco": ["Rideau Luxe"],
  "Persienne Design": ["Persienne Bois"],
  "Sol-r": ["Solair 3000"]
};
const mecanismesParFabricant = {
  Faber: ["Chaînette", "Motorisation"],
  Altex: ["Manuel"],
  "Ambiance Déco": ["Rail"],
  "Persienne Design": ["Inclinaison"],
  "Sol-r": ["Commande"]
};
const tissus = ["Lin", "Perle"];
const couleurs = ["Blanc", "Ivoire"];
const controles = ["Gauche", "Droite"];
const fractions = ["0/8", "1/4", "1/2"];
const moteurs = ["Somfy RTS", "Zigbee"];
const cassettes = ["Open Roll", "Fascia 3\""];

export default function DemoPage() {
  const [client, setClient] = useState<Client>({
    nom: "", prenom: "", telephone: "", courriel: "", adresse: "", ville: ""
  });
  const [fenetre, setFenetre] = useState<Fenetre>({
    nom: "", fabricant: "", produit: "", tissu: "", couleur: "", largeur: "", largeurFraction: "0/8",
    hauteur: "", hauteurFraction: "0/8", controle: "", mecanisme: "", moteur: "", poseInterieure: false,
    poseMurale: false, inverse: false, cassette: "", couleurCassette: "", prixListe: 0, coutant: 0, prixVente: 0
  });
  const [fenetres, setFenetres] = useState<Fenetre[]>([]);
  const [notes, setNotes] = useState("");

  const ajouterFenetre = () => {
    const nouvelle = { ...fenetre, id: Date.now(), quantite: 1 };
    setFenetres([...fenetres, nouvelle]);
    setFenetre({ ...fenetre, nom: "", largeur: "", hauteur: "" });
  };

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <ClientForm client={client} setClient={setClient} />
      <WindowForm {...{ fenetre, setFenetre, fabricants, produitsParFabricant, tissus, couleurs, controles, fractions, mecanismesParFabricant, moteurs, cassettes, ajouterFenetre }} />
      <WindowList fenetres={fenetres} setFenetres={setFenetres} setFenetre={setFenetre} />
      <NotesSection notes={notes} setNotes={setNotes} />
      <button
        onClick={() => validerAvantSoumission(client, fenetres)}
        className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
      >
        Soumettre la soumission
      </button>
    </div>
  );
}
