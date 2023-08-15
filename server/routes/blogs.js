import express from 'express';
import path from 'path';
const router = express.Router();

import blogController from '../controllers/blogController.js';

router.get('/', (req, res) => {
    return res.status(201).json('hello');
})

router.post('/', blogController.createBlog, (req, res) => {
    return res.status(201);
})

export default router;