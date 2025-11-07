export interface Character {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
  liked?: boolean;
}

export interface CharacterFormData {
  firstName: string;
  lastName: string;
  title: string;
  family: string;
  image: string;
}