import express from 'express';
import path from 'path';
const router = express.Router();

import blogController from '../controllers/blogController.js';

router.get('/', (req, res) => {
    return res.status(201).json('hello');
})

router.post('/', blogController.createBlog, blogController.setTags, (req, res) => {
    console.log('successful blog creation')
    return res.status(201).json(res.locals.blogID);
})



export default router;