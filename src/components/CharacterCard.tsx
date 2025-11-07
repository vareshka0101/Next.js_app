"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Character } from "../types/character";

interface CharacterCardProps {
  character: Character;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onLike,
  onDelete,
}) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".action-button")) {
      router.push(`/characters/${character.id}`);
    }
  };

  const getFamilyColor = (family: string) => {
    const familyColors: { [key: string]: string } = {
      Stark: "#C0C0C0",
      Lannister: "#C00000",
      Targaryen: "#FF0000",
      Baratheon: "#FFD700",
      Greyjoy: "#000000",
      Tyrell: "#90EE90",
      Martell: "#FFA500",
      Arryn: "#0000FF",
      Tully: "#00BFFF",
      Frey: "#808080",
    };
    return familyColors[family] || "#6B7280";
  };

  return (
    <div
      className="character-card"
      onClick={handleCardClick}
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        height: "420px",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <div
        style={{
          position: "relative",
          height: "220px",
          marginBottom: "12px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Image
          src={character.imageUrl}
          alt={character.fullName}
          fill
          style={{
            objectFit: "cover",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              onLike(character.id);
            }}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: character.liked ? "#ff4444" : "#666",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {character.liked ? "❤️" : "🤍"}
          </button>
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(character.id);
            }}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            🗑️
          </button>
        </div>

        {character.family && (
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              background: getFamilyColor(character.family),
              color: "white",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {character.family}
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "18px",
            lineHeight: "1.3",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {character.fullName}
        </h3>

        {character.title && (
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "0 0 8px 0",
              fontStyle: "italic",
            }}
          >
            {character.title}
          </p>
        )}

        <div style={{ marginTop: "auto" }}>
          {character.family && character.family !== "None" && (
            <p
              style={{
                color: "#666",
                fontSize: "13px",
                margin: "4px 0",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              🏰 House {character.family}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
