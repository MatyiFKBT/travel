import { Router } from "express";
import { Comment } from "../entities/comment";

export const commentRouter = Router();

commentRouter
    .use((req, _res, next) => {
        req.commentRepository = req.orm.em.getRepository(Comment);
        next();
    })
    .get('/:id', async (req, res) => {
        //TODO add user check
        const id = parseInt(req.params.id);
        const comment = await req.commentRepository!.findOne({ id });
        return res.send(comment);
    })
    .get('/', async (req, res) => {
        //TODO add user check
        const comments = await req.commentRepository!.findAll();
        return res.send(comments);
    })
    .patch('/:id',async (req, res)=>{
        //TODO add user check
        const { text } = req.body;
        const id = parseInt(req.params.id);
        const comment = await req.commentRepository!.findOne({id});
        if(!comment){
            return res.send(404);
        }
        comment.text = text;
        await req.commentRepository!.persistAndFlush(comment);
        return res.send(comment);
    })
    .delete('/:id',async (req, res)=>{
        const id = parseInt(req.params.id);
        const comment = await req.commentRepository!.findOne({id});
        if(!comment){
            return res.send(404);
        }
        await req.commentRepository!.removeAndFlush(comment);
        return res.send(200);
    })