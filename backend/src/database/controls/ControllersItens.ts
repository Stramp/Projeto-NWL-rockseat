import { Request, Response } from 'express';
import knex from '../connection';

export default class ControllersItens {

    /*   async create(req: Request, resp: Response) {
           const { nome, img, email, whatsapp, rua, numero, cidade, uf, items } = req.body;
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
           const pontoItem = items.map((id: Number) => {
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
       }*/

    async index(req: Request, resp: Response) {

        const itens = await knex('items')
            .select('*')


        return resp.json({
            itens
        });
    }

    /*  async show(req: Request, resp: Response) {
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
      }*/

}
