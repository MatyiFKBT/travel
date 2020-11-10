import { Router } from "express";
import { passport } from "../auth/passport";
import { commentRouter } from "./comment.controller";
import { entryRouter } from "./entry.controller";
import { tagRouter } from "./tag.controller";
import { userRouter } from "./user.controller";

export const routes = Router();

routes.use('/users',userRouter);
routes.use('/entries',passport.authenticate('jwt', { session: false }),entryRouter);
routes.use('/tags',tagRouter);
routes.use('/comments',commentRouter); //TODO jwt