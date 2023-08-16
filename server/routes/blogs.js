import express from 'express';
import path from 'path';
const router = express.Router();

import blogController from '../controllers/blogController.js';

router.get('/', blogController.getAllPosts, (req, res) => {
  console.log(res.locals);
  return res.status(201).json(res.locals.generalFeed);
});

router.post(
  '/',
  blogController.createBlog,
  blogController.setTags,
  (req, res) => {
    console.log('successful blog creation');
    return res.status(201).json(res.locals.blogID);
  }
);

export default router;
