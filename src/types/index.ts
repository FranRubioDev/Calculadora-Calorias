export type CategoryT = {
  id: number;
  name: string;
};

export type ActivityT = {
  id: string | number;
  category: number;
  name: string;
  calories: number;
};
