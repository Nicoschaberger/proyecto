import UserDTO from "../dao/dtos/user.dto.js";
import {expect} from 'chai';

describe('Test en UserDTO', () => {
    it('Corroborar que el DTO unifique el nombre y apellido en una única propiedad', () => {
        const user = UserDTO.getUserTokenFrom({
            first_name: 'Nicolas',
            last_name: 'Schaberger',
            role: 'admin',
            email: 'nicolasschaberger.13@gmail.com',
            password: '12345678'
        });

        expect(user.name).to.be.equal('Nicolas Schaberger');
    })
})