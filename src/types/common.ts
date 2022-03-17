export type Nullable<T> = T | null;

export type Indexed = Record<string, unknown>;

export type Fn = () => void;

export type WithTimeStamps<T = Indexed> = T & {
  createdAt?: string;
  updatedAt?: string;
};
