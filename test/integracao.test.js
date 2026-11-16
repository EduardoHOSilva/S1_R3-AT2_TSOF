import app from '../src/app.js';
import request from 'supertest';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearFunction } from './utils/clearDatabase.js';
import { MontadoraFactory } from './factories/MontadoraFactory.js';

describe('Testes de Montadoras', () => {
    beforeEach(async () => {
        await MontadoraFactory.create('Toyota', 'Japão');
        await MontadoraFactory.create('Honda', 'Japão');
        await MontadoraFactory.create('Mitsubishi', 'Japão');
        
        vi.clearAllMocks();
    });
    
    afterEach(async () => {
        await clearFunction();
        
        vi.resetAllMocks();
    });

    it('Deve criar uma nova montadora', async () => {
        const response = await request(app)
            .post('/montadoras') 
            .send({ 
                nome: 'Nissan',
                pais: 'Japão'
            })

            expect(response.status).toBe(201); 
            expect(response.body.data).toHaveProperty('insertId')
    });

    it('Deve deletar uma montadora', async () => {

        const montadora = await MontadoraFactory.create('Chevrolet', 'USA');

        const response = await request(app)
            .delete('/montadoras/' + montadora.id);
            expect(response.status).toBe(200); 
    });
});