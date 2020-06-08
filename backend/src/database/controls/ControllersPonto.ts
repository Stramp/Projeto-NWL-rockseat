import { Request, Response } from 'express';
import knex from '../connection';

export default class ControllersPonto {

    async create(req: Request, resp: Response) {
        const { nome, img, email, whatsapp, rua, numero, cidade, uf, itens } = req.body;
        console.log('no controler do cadastra', req.body)
        const trx = await knex.transaction();

        const idItem = await trx('pontos')
            .insert({
                nome,
                img: 'imgdefault',
                email,
                whatsapp,
                rua,
                numero,
                cidade,
                uf
            });
        const pontoItem = itens.map((id: Number) => {
            return {
                ponto_id: idItem[0],
                item_id: id

            }
        });
        await trx('pontos_items').insert(pontoItem);
        await trx.commit();
        return resp.json({
            nome, email
        });
    }

    async index(req: Request, resp: Response) {
        const { cidade, uf, items } = req.query;
        const parseItems = String(items).split(',').map(item => {
            return Number(item.trim());
        });
        const pontos = await knex('pontos')
            .join('pontos_items', 'pontos.id', '=', 'pontos_items.ponto_id')
            .whereIn('pontos_items.item_id', parseItems)
            .where('cidade', String(cidade))
            .where('uf', String(uf))
            .distinct()
            .select('pontos.*')


        return resp.json({
            pontos
        });
    }

    async allIndex(req: Request, resp: Response) {

        const itens = await knex('pontos')
            .select('*');


        return resp.json({
            itens
        });
    }

    async show(req: Request, resp: Response) {
        const { id } = req.params;

        const pontoColeta = await knex('pontos')
            .where('id', id).first();

        if (!pontoColeta) return resp.status(400).json({ menssagem: "nao encontrado" })

        const items = await knex('items')
            .join('pontos_items', 'items.id', '=', 'pontos_items.item_id')
            .where('pontos_items.ponto_id', id);

        return resp.status(200).json({
            pontoColeta, items
        });
    }

}
