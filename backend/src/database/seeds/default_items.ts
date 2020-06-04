import Knex from "knex";

export async function seed(knex: Knex) {
    await knex('items').insert([
        { item: 'Lampadas', img: 'lampadas.svg', qtd: "5" },
        { item: 'Pilhas e Baterias', img: 'baterias.svg', qtd: "5" },
        { item: 'Papeis e Papelão', img: 'papeis-papelao.svg', qtd: "5" },
        { item: 'Resíduos Eletrônicos', img: 'eletronicos.svg', qtd: "5" },
        { item: 'Resíduos Orgânicos', img: 'organicos.svg', qtd: "5" },
        { item: 'Oleo de cozinha', img: 'oleo.svg', qtd: "5" },
    ])
}