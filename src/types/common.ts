export type Nullable<T> = T | null;

export type Indexed = Record<string, unknown>;

export type Fn = () => void;

// TODO удалить ?
export type LoadStatus = 'success' | 'pending' | 'failed';
