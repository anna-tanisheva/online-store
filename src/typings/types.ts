export enum SortOrder {
  'alphabetic-ascending' = 1,
  'alphabetic-descending',
  'year-ascending',
  'year-descending'
}

export enum FilterTypes {
  'color' = 1,
  'produced',
  'popular',
  'type',
  'memory'
}

export interface ISettingsObj<T, U> {
  'sort': T | null;
  'filter': {
    'year': {
      'min': T | null;
      'max': T | null;
    },
    'stock': {
      'min': T | null;
      'max': T | null;
    },
  },
  'color': Set<U> | null;
  'produced': Set<U> | null;
  'popular': Set<U> | null;
  'type': Set<U> | null;
  'memory': Set<U> | null;
  'searchValue': U | null;
}

export interface ItemsInCart {
  [key: string]: number,
  'length': number
}