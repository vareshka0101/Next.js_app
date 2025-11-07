"use client";

import { useEffect, useState } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";
import CharacterList from "../../components/CharacterList";
import Layout from "../../components/Layout";

export default function CharactersPage() {
  const {
    fetchCharacters,
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  } = useCharacterStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, setSearchQuery]);

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading characters...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
          <p>Error: {error}</p>
          <button
            onClick={fetchCharacters}
            style={{
              padding: "8px 16px",
              backgroundColor: "#0258b4ff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Search characters..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "300px",
                maxWidth: "100%",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => setFilter("all")}
              style={{
                padding: "8px 16px",
                border: "1px solid #ddd",
                backgroundColor: filter === "all" ? "#34488fff" : "white",
                color: filter === "all" ? "white" : "black",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              All Characters
            </button>
            <button
              onClick={() => setFilter("liked")}
              style={{
                padding: "8px 16px",
                border: "1px solid #ddd",
                backgroundColor: filter === "liked" ? "#911c1cff" : "white",
                color: filter === "liked" ? "white" : "black",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Favorite Characters
            </button>
          </div>
        </div>
      </div>

      <CharacterList />
    </Layout>
  );
}
