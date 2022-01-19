import { Request, Response } from 'express';

import { connect } from '../database';
import { Post } from '../interface/post.interface';
import { QueryError } from 'mysql2';

export async function getAll(req: Request, res: Response): Promise<Response | void> {
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM posts');
    return res.json(posts[0]).status(200);
}

export async function createPost(req: Request, res: Response) {
    const newPost: Post = req.body;

    if (!newPost.title || !newPost.text) {
        return res.json({
            message: 'invalid_credentials',
        }).status(401);
    }

    const conn = await connect();

    try {
        await conn.query('INSERT INTO posts SET ?', [newPost]);
    } catch (e: any) {
        return res.json({
            message: e.sqlMessage,
        }).status(400);
    }

    return res.json({
        message: 'success',
    }).status(201);
}

export async function getOne(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await connect();
    const post = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);

    if (!Object.keys(post[0]).length) {
        return res.json({
            message: 'not_found',
        }).status(404);
    }

    return res.json(post[0]).status(200);
}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await connect();
    const post = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);

    if (!Object.keys(post[0]).length) {
        return res.json({
            message: 'not_found',
        }).status(404);
    }

    try {
        await conn.query('DELETE FROM posts WHERE id = ?', [id]);
    } catch (e: any) {
        return res.json({
            message: e.sqlMessage,
        }).status(400);
    }

    return res.json({
        message: 'success',
    }).status(200);
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await connect();
    const post = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);

    if (!Object.keys(post[0]).length) {
        return res.json({
            message: 'not_found',
        }).status(404);
    }

    const updatePost: Post = req.body;

    try {
        await conn.query('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
    } catch (e: any) {
        return res.json({
            message: e.sqlMessage,
        }).status(400);
    }

    const updatedPost = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);

    return res.json(updatedPost[0]).status(200);
}
