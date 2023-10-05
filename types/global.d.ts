declare namespace Express {
  export interface Request {
      context: {
          db: Map<string, Set<string>>;
      };
  }
}
