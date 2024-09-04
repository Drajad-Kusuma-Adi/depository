export interface UserData {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: File;
  is_banned: boolean;
  remember_token?: string;
  created: string;
  updated: string;
}

export interface ProductData {
  id: string;
  owner: UserData;
  name: string;
  description?: string;
  price: number;
  // category: "food" | "drink" | "female_fashion" | "male_fashion" | "child_fashion" | "furniture";
  category: string;
  created: string;
  updated: string;
}

export interface TransactionData {
  id: string;
  customer: UserData;
  payment_method: string;
  // longitude: number;
  // latitude: number;
  address_criteria: string;
  items: object[];
  created: string;
  updated: string;
}

