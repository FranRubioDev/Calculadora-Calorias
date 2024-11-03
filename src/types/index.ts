export type CategoryT = {
  id: number;
  name: string;
};

export type ActivityT = {
  id: string;
  category: number;
  name: string;
  calories: number;
};
