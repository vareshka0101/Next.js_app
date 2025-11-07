import { create } from 'zustand';
import { Character, CharacterFormData } from '../types/character';
import axios from 'axios';

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  fetchCharacters: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteCharacter: (id: number) => void;
  addCharacter: (character: CharacterFormData) => void;
  updateCharacter: (id: number, character: CharacterFormData) => void;
  filter: 'all' | 'liked';
  setFilter: (filter: 'all' | 'liked') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  loading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 8,

  fetchCharacters: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://thronesapi.com/api/v2/Characters');
      const charactersWithLikes = response.data.map((character: Character) => ({
        ...character,
        liked: false,
      }));
      set({ characters: charactersWithLikes, loading: false });
    } catch (error) {
      console.error('Error fetching characters:', error);
      set({ 
        error: 'Failed to fetch characters. Please try again later.', 
        loading: false 
      });
    }
  },

  toggleLike: (id) => {
    set((state) => ({
      characters: state.characters.map((character) =>
        character.id === id ? { ...character, liked: !character.liked } : character
      ),
    }));
  },

  deleteCharacter: (id) => {
    set((state) => ({
      characters: state.characters.filter((character) => character.id !== id),
    }));
  },

  addCharacter: (characterData) => {
    const newCharacter: Character = {
      id: Date.now(),
      firstName: characterData.firstName,
      lastName: characterData.lastName,
      fullName: `${characterData.firstName} ${characterData.lastName}`,
      title: characterData.title,
      family: characterData.family,
      image: characterData.image,
      imageUrl: characterData.image,
      liked: false,
    };
    set((state) => ({
      characters: [newCharacter, ...state.characters],
    }));
  },

  updateCharacter: (id, characterData) => {
    set((state) => ({
      characters: state.characters.map((character) =>
        character.id === id ? { 
          ...character, 
          ...characterData,
          fullName: `${characterData.firstName} ${characterData.lastName}`,
          imageUrl: characterData.image
        } : character
      ),
    }));
  },

  setFilter: (filter) => {
    set({ filter, currentPage: 1 });
  },

  setSearchQuery: (searchQuery) => {
    set({ searchQuery, currentPage: 1 });
  },

  setCurrentPage: (currentPage) => {
    set({ currentPage });
  },
}));