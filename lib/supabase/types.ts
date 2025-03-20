export type User = {
  id: string;
  name: string | null;
  email: string;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  relationship_type: string;
  interests: string | null;
  image_url: string | null;
  user_id: string;
  created_at: string;
};

export type ImportantDate = {
  id: string;
  contact_id: string;
  event_type: string;
  date: string;
  user_id: string;
  created_at: string;
};

export type GiftSuggestion = {
  id: string;
  contact_id: string;
  name: string;
  description: string;
  price: number;
  is_favorite: boolean;
  user_id: string;
  created_at: string;
};
