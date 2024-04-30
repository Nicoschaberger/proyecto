import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Testing adoptme', () => {
    describe('test de endpoint de mascotas', () => {
        it('El endpoint POST /api/pets debe crear un cart correctamente', async () => {
            const cartMock = {
                product: 'perros',
                quantity: 2
            };

            const response = await requester.post('/api/pets').send(cartMock);

            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.property('_id');
        });
    });
});