import { connection } from "../../src/configs/Database.js";

export async function clearFunction() {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0'); //Não verifica as chaves estrangeiras para deletar os registros

    await connection.query('DELETE FROM veiculos');
    await connection.query('DELETE FROM clientes');
    await connection.query('DELETE FROM montadoras');

    await connection.query('SET FOREIGN_KEY_CHECKS = 1'); // Verifica as chaves estrangeiras novamente.
};