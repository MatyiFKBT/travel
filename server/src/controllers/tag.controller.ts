import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Tag } from "../entities/tag";

export const tagRouter = Router();

tagRouter
    .use((req, _res, next) => {
        req.tagRepository = req.orm.em.getRepository(Tag);
        next();
    })
    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const tag = await req.tagRepository!.findOne({ id });
        return res.send(tag);
    })
    .get('/', async (req, res) => {

        const tags = await req.tagRepository!.findAll();
        return res.send(tags);
    })
    .post('/', async (req, res) => {
        const { text } = req.body;
        const tag = new Tag();
        wrap(tag).assign({ text }, { em: req.orm.em });
        await req.tagRepository!.persistAndFlush(tag);
        return res.status(201).send(tag);
    })
    .patch('/:id',async (req, res)=>{
        const { text } = req.body;
        const id = parseInt(req.params.id);
        const tag = await req.tagRepository!.findOne({id});
        if(!tag){
            return res.send(404);
        }
        tag.text = text;
        await req.tagRepository!.persistAndFlush(tag);
        return res.send(tag);
    })
    .delete('/:id',async (req, res)=>{
        const id = parseInt(req.params.id);
        const tag = await req.tagRepository!.findOne({id});
        if(!tag){
            return res.send(404);
        }
        await req.tagRepository!.removeAndFlush(tag);
        return res.send(200);
    })