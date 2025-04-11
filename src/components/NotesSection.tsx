
import React from "react";

type Props = {
  notes: string;
  setNotes: (value: string) => void;
};

export default function NotesSection({ notes, setNotes }: Props) {
  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">Notes</h2>
      <textarea
        placeholder="Ajouter des notes ou commentaires..."
        className="w-full border p-2 rounded mb-4"
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}
