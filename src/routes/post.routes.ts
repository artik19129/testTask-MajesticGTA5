import { Router } from 'express'
import { getAll, createPost, getOne, deletePost, updatePost } from '../controllers/post.controller'

const router = Router();

router.route('/')
    .get(getAll)
    .post(createPost);

router.route('/:id')
    .get(getOne)
    .delete(deletePost)
    .put(updatePost);

export default router;
