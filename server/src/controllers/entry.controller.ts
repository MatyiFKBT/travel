import { MikroORM, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Comment } from "../entities/comment";
import { Tag } from "../entities/tag";
import { TravelEntry } from "../entities/travelentry";

export const entryRouter = Router();
const populate = ['comments','tags'];
entryRouter
    .use((req,_res,next) => {
        req.entryRepository = req.orm.em.getRepository(TravelEntry);
        req.tagRepository = req.orm.em.getRepository(Tag);
        next();
    })
    .get('/', async (req,res)=>{
        const loggedInUserId = (req.user!.id);
        let entries = await req.entryRepository!.find({user:loggedInUserId},populate);
        res.send(entries);
    })
    .get('/:id', async (req,res)=>{
        const loggedInUserId = (req.user!.id);
        const id = parseInt(req.params.id);
        let entry = await req.entryRepository!.findOne({user:loggedInUserId, id},populate);
        res.send(entry);
    })
    .post('/', async (req,res)=>{
        const {latlon, start_date, end_date, desc}  = req.body;
        const loggedInUserId = (req.user!.id);
        let entry = new TravelEntry();
        wrap(entry).assign({
            user: loggedInUserId,
            latlon,
            start_date,
            end_date,
            desc
        },
        { em: req.orm.em });
        await req.entryRepository!.persistAndFlush(entry);
        return res.status(201).send(entry);

    })
    .patch('/:entryId/tag', async (req,res)=>{
        const loggedInUserId = (req.user!.id);
        const entryId = parseInt(req.params.entryId);
        const id = parseInt(req.body.tagId);
        const entry = await req.entryRepository!.findOne({user:loggedInUserId, id:entryId},populate);
        if(!entry){
            return res.status(404).send('No entry with that id.');
        }
        const tag = await req.tagRepository!.findOne({id},['entries']);
        if(!tag){
            return res.status(404).send('No tag with that id.');
        }

        if(entry!.tags.contains(tag)){
            entry.tags.remove(tag)
            tag.entries.remove(entry)
        } else {
            entry.tags.add(tag)
            tag.entries.add(entry)
        }
        await req.entryRepository!.flush();
        return res.send(entry);
    })
    .post('/:entryId/comment',async (req, res)=>{
        const loggedInUserId = (req.user!.id);
        const entryId = parseInt(req.params.entryId);
        const {text} = req.body;
        const entry = await req.entryRepository!.findOne({user:loggedInUserId, id:entryId},populate);
        if(!entry){
            return res.status(404).send('No entry with that id.');
        }
        const comment = new Comment();
        wrap(comment).assign({text,author:loggedInUserId},{em:req.orm.em});
        entry.comments.add(comment)
        await req.entryRepository!.flush();
        return res.send(entry);
    })