export interface Body {
  value: string;
}

export interface Headers {
  token: string;
}

export type DB = Map<string, Set<string>>;
