export type RecursiveReadonly<T> = {
  +readonly [P in keyof T]: RecursiveReadonly<T[P]>;
};

export type RecursiveWritable<T> = {
  -readonly [P in keyof T]: RecursiveWritable<T[P]>;
};

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursivePartial<T[P]>;
};
