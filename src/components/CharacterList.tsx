"use client";

import React from "react";
import { useCharacterStore } from "../store/useCharacterStore";
import CharacterCard from "./CharacterCard";

const CharacterList: React.FC = () => {
  const {
    characters,
    toggleLike,
    deleteCharacter,
    filter,
    searchQuery,
    currentPage,
    itemsPerPage,
    setCurrentPage,
  } = useCharacterStore();

  const filteredCharacters = characters.filter((character) => {
    const matchesFilter = filter === "all" || character.liked;
    const matchesSearch =
      character.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCharacters = filteredCharacters.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (paginatedCharacters.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>No characters found.</p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
          padding: "16px 0",
        }}
      >
        {paginatedCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onLike={toggleLike}
            onDelete={deleteCharacter}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            gap: "8px",
          }}
        >
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              backgroundColor: currentPage === 1 ? "#f5f5f5" : "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                backgroundColor: currentPage === page ? "#8B0000" : "white",
                color: currentPage === page ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              backgroundColor: currentPage === totalPages ? "#f5f5f5" : "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
