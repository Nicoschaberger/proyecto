import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Testing adoptme', () => {
    describe('test de endpoint de mascotas', () => {
        it('El endpoint POST /api/pets debe crear un cart correctamente', async () => {
            const ProductDTO = {
                product: 'celular',
                quantity: 2
            };

            const response = await requester.post('/api/cart').send(ProductDTO);

            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.property('_id');
        });
    });
});