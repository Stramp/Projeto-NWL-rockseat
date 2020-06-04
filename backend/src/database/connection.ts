import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
})

export default connection;

/***
 *
 * tabela pontos de coleta
    *  img
    *  nome
    *  email
    *  whatsapp
    *  rua
    *  numero
    *  cidade
    *  uf
 *
 * tabela itens coletados
    *  img
    *  nome
    *  qtd (em kilos)
 *
 * tabela ponto-items (intermediaria para relação n-n)
    *  id-items
    *  id-ponto
 *
 * funcionalidades
    * cadastrar pontos de coletas
    * cadastrar items q determinado ponto coleta
    * listar items coletados
    * listar pontos filtros UF cidade e items
    * listar 1 unico ponto de coleta especifico
 *
 */