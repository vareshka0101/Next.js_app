"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CharacterFormData } from "../types/character";

interface CharacterFormProps {
  initialData?: CharacterFormData;
  onSubmit: (data: CharacterFormData) => void;
  isEditing?: boolean;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  initialData,
  onSubmit,
  isEditing = false,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<CharacterFormData>(
    initialData || {
      firstName: "",
      lastName: "",
      title: "",
      family: "",
      image: "",
    }
  );

  const [errors, setErrors] = useState<Partial<CharacterFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CharacterFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.family.trim()) {
      newErrors.family = "Family/House is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!formData.image.startsWith("http")) {
      newErrors.image =
        "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof CharacterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const popularFamilies = [
    "Stark",
    "Lannister",
    "Targaryen",
    "Baratheon",
    "Greyjoy",
    "Tyrell",
    "Martell",
    "Arryn",
    "Tully",
    "Frey",
    "Bolton",
    "Mormont",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "24px", textAlign: "center", color: "#333" }}>
        {isEditing ? "Edit Character" : "Create New Character"}
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="firstName"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            border: `2px solid ${errors.firstName ? "#f44336" : "#e0e0e0"}`,
            borderRadius: "6px",
            fontSize: "16px",
            transition: "border-color 0.2s ease",
          }}
          placeholder="Enter first name"
        />
        {errors.firstName && (
          <span
            style={{
              color: "#f44336",
              fontSize: "14px",
              marginTop: "6px",
              display: "block",
            }}
          >
            {errors.firstName}
          </span>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="lastName"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Last Name *
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            border: `2px solid ${errors.lastName ? "#f44336" : "#e0e0e0"}`,
            borderRadius: "6px",
            fontSize: "16px",
          }}
          placeholder="Enter last name"
        />
        {errors.lastName && (
          <span
            style={{
              color: "#f44336",
              fontSize: "14px",
              marginTop: "6px",
              display: "block",
            }}
          >
            {errors.lastName}
          </span>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="title"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Title (Optional)
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "16px",
          }}
          placeholder="e.g., King of the Andals, Lord of Winterfell"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="family"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Family/House *
        </label>
        <select
          id="family"
          name="family"
          value={formData.family}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            border: `2px solid ${errors.family ? "#f44336" : "#e0e0e0"}`,
            borderRadius: "6px",
            fontSize: "16px",
            backgroundColor: "white",
          }}
        >
          <option value="">Select a house</option>
          {popularFamilies.map((family) => (
            <option key={family} value={family}>
              House {family}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {errors.family && (
          <span
            style={{
              color: "#f44336",
              fontSize: "14px",
              marginTop: "6px",
              display: "block",
            }}
          >
            {errors.family}
          </span>
        )}
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label
          htmlFor="image"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Image URL *
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            border: `2px solid ${errors.image ? "#f44336" : "#e0e0e0"}`,
            borderRadius: "6px",
            fontSize: "16px",
          }}
          placeholder="https://example.com/character-image.jpg"
        />
        {errors.image && (
          <span
            style={{
              color: "#f44336",
              fontSize: "14px",
              marginTop: "6px",
              display: "block",
            }}
          >
            {errors.image}
          </span>
        )}
        <small
          style={{
            color: "#666",
            fontSize: "12px",
            marginTop: "4px",
            display: "block",
          }}
        >
          Must be a valid URL starting with http:// or https://
        </small>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            padding: "12px 24px",
            border: "2px solid #e0e0e0",
            borderRadius: "6px",
            backgroundColor: "white",
            color: "#333",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "all 0.2s ease",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#8B0000",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "all 0.2s ease",
          }}
        >
          {isEditing ? "Update Character" : "Create Character"}
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
          }}
        >
          * Required fields
        </p>
      </div>
    </form>
  );
};

export default CharacterForm;
