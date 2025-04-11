# Lestoriste - Générateur de soumissions

Ce projet React permet de générer dynamiquement des soumissions client incluant des fenêtres, des configurations de tissu, couleur, mécanisme, etc.

## 🛠 Technologies utilisées

- React + TypeScript
- Zod (validation de formulaire)
- react-hot-toast (notifications)

## 📦 Installation

```bash
npm install
npm run dev
```

## 📁 Structure

- `src/components/ClientForm.tsx` : formulaire client
- `src/components/WindowForm.tsx` : formulaire d'ajout de fenêtre
- `src/components/WindowList.tsx` : aperçu et gestion des fenêtres
- `src/components/NotesSection.tsx` : zone de texte libre
- `src/types.ts` : interfaces et schémas de validation Zod

## ✅ Validation

Le formulaire utilise `Zod` pour valider les données en temps réel.
Un bouton `Soumettre la soumission` permet une validation globale.

