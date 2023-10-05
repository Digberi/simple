import request from 'supertest';
import { app } from '../src';
import { environment } from '../src/environment';

let token: string;
const testvalue = 'testvalue';
let encryptedValue: string;

describe('Microservice E2E Tests', () => {

  it('should generate a token', async () => {
    const response = await request(app).get('/token');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('should encrypt a value', async () => {
    const response = await request(app)
      .post('/encrypt')
      .set('token', token)
      .send({ value: testvalue });

    encryptedValue = response.body.value;

    expect(response.status).toBe(200);
    expect(response.body.value).toMatch(new RegExp(`^${environment.prefix}`));    

  });

  it('should decrypt a value', async () => {
    const response = await request(app)
      .get(`/decrypt/${encryptedValue}`)
      .set('token', token)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.value).toBe(testvalue);
  });
});
