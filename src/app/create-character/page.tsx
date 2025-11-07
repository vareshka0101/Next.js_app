"use client";

import { useRouter } from "next/navigation";
import { useCharacterStore } from "../../store/useCharacterStore";
import CharacterForm from "../../components/CharacterForm";
import Layout from "../../components/Layout";
import { CharacterFormData } from "../../types/character";

export default function CreateCharacterPage() {
  const router = useRouter();
  const { addCharacter } = useCharacterStore();

  const handleSubmit = (formData: CharacterFormData) => {
    addCharacter(formData);
    router.push("/characters");
  };

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              margin: "0 0 8px 0",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
            }}
          >
            Create New Character
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#666",
              textAlign: "center",
            }}
          >
            Add a new character to your collection
          </p>
        </div>

        <CharacterForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
