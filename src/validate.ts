import { IncomingHttpHeaders } from 'http';
import { HttpError } from './errors';
import { DB } from './types';
import { hasPrefix } from './prefix';

export function validateToken(token: IncomingHttpHeaders[string], db: DB): asserts token is string{
  if(!token || typeof token !== 'string' || !db.has(token)) {
    throw new HttpError(401, 'Token invalid');
  }
}

export function validateValue(value: qs.ParsedQs[string], values: Set<string>): asserts value is string{
  if(!value || typeof value !== 'string' || !hasPrefix(value) || !values.has(value)) {
    throw new HttpError(400, 'Value invalid');
  }
}