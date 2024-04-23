import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing adoptme', () => {
    describe('test de endpoint de mascotas', () => {
        it('El endpoint POST /api/pets debe crear un cart correctamente', async () => {
            const cartMock = {
                product: 'Celular',
                quantity: 2
            }

            const { statusCode, _body } = await requester.post('/api/cart').send(cartMock);
            expect(statusCode).to.be.eql(200);
            expect(_body.payload).to.have.property('_id');
        });
    });
});