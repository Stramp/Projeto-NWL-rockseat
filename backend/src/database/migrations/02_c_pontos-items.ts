import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pontos_items', table => {
        table.increments('id').primary();
        table.integer('ponto_id').notNullable().references('id').inTable('pontos-de-coleta');
        table.integer('item_id').notNullable().references('id').inTable('items-coletados');

    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pontos_items');
}