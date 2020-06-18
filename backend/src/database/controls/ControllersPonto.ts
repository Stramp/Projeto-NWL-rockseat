import { Request, Response } from 'express';
import knex from '../connection';
export interface PontosBd {
    nome: string,
    img: string,
    email: string,
    whatsapp: string,
    numero: string,
    cidade: string,
    uf: string,
    rua: string,
    id: number
}
export default class ControllersPonto {

    async create(req: Request, resp: Response) {
        const { nome, email, whatsapp, rua, numero, cidade, uf, itens } = req.body;
        const img = req.file.filename;
        const trx = await knex.transaction();

        const idItem = await trx('pontos')
            .insert({
                nome,
                img,
                email,
                whatsapp,
                rua,
                numero,
                cidade,
                uf
            });
        const pontoItem = itens
            .split(',')
            .map((item: String) => Number(item.trim()))
            .map((id: Number) => {
                return {
                    ponto_id: idItem[0],
                    item_id: id

                }
            });
        await trx('pontos_items').insert(pontoItem);
        await trx.commit();
        return resp.json({
            nome, email, img
        });
    }

    async index(req: Request, resp: Response) {

        const { cidade, uf } = req.query;
        const pontos = await knex('pontos')
            //.join('pontos_items', 'pontos_items.ponto_id', '=', 'pontos.id')
            .where('cidade', String(cidade))
            .where('uf', String(uf))
            .distinct()
            .select('pontos.*')

        console.log("items11111111sss ::: ", pontos)

        const serializedPontos = pontos.map(ponto => {

            return {
                ...ponto,
                img: `http://localhost:3666/uploads/${ponto.img}`


            }
        });
        console.log("itemssss :serializedPontos:: ", serializedPontos)
        let itemsPerPoint: any[] = [];
        for (let index = 0; index < serializedPontos.length; index++) {
            const element = serializedPontos[index];
            console.log(element.id, "eleID")
            itemsPerPoint.push(await knex('items')
                .join('pontos_items', 'items.id', '=', 'pontos_items.item_id')
                .where('pontos_items.ponto_id', element.id));
        }
        let ipp: any[];

        const pontosEntrega = serializedPontos.map((item, i) => {
            console.log('**********************', i, '****************************************************')
            console.log(">>", itemsPerPoint[i])
            console.log('**********************', i, '****************************************************')

            let ippName = itemsPerPoint.map((rec, r) => {
                console.log(i, ">>>>", r, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                console.log(i, ">iii>", itemsPerPoint[i][r])
                console.log(i, ">>>>>>>", r, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                return itemsPerPoint[i][r]
            })



            console.log("#####################################")
            console.log("###", ippName)
            console.log("#####################################")


            const ITEMS = ippName

            return ({
                ...item,

            })
        })





        return resp.json({
            pontos: pontosEntrega,
            query: { cidade, uf }

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
        console.log("oi ? no show ? ", req.params)
        const { id } = req.params;

        const pontoColeta = await knex('pontos')
            .where('id', id).first();

        if (!pontoColeta) return resp.status(400).json({ menssagem: "nao encontrado" })

        const items = await knex('items')
            .join('pontos_items', 'items.id', '=', 'pontos_items.item_id')
            .where('pontos_items.ponto_id', id);

        console.log("ponto de3 controle?????")
        console.table(items)

        return resp.status(200).json({
            pontoColeta, items
        });
    }

}
