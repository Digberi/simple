import { encrypt, decrypt, generateToken } from './crypto.utils';
import express from 'express';
import { environment } from './environment';
import { validateToken, validateValue } from './validate';
import { addPrefix, removePrefix } from './prefix';
import { errorMiddleware } from './error.middleware';
import { dbMiddleware } from './db.middleware';

const app = express();

app.use(express.json());
app.use(errorMiddleware())
app.use(dbMiddleware())

app.get('/token', (req, res) => {
  const { db } = req.context;

  const token = generateToken();
  db.set(token, new Set());

  res.status(201).send({
    token,
  });
})


app.post('/encrypt', (req, res) => {
  const { db } = req.context;
  const { token } = req.headers;
  const { value } = req.body;

  validateToken(token, db);

  const encryptedText = encrypt(value);

  const result = addPrefix(encryptedText);

  db.get(token)!.add(result);

  res.send({
    value: result,
  });
})

app.get('/decrypt/:value', (req, res) => {
  const { db } = req.context;
  const { token } = req.headers;
  const { value } = req.params;

  validateToken(token, db);
  const values = db.get(token)!;

  validateValue(value, values);

  const valueWithoutPrefix = removePrefix(value);

  const decryptedText = decrypt(valueWithoutPrefix);
  res.status(200).send({
    value: decryptedText,
  });

  values.delete(value);
  if (values.size === 0) {
    db.delete(token);
  }
})

app.listen(environment.PORT, () => {
  console.log(`Server listening on port ${environment.PORT}`);
})

export { app }