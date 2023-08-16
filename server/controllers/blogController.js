import db from '../models/dbConfig.js';

const blogController = {
    // create a blog
    async createBlog(req, res, next) {
        try {
            console.log('body: ', req.body);
            const { _id, title, body } = req.body;
            const query = 'INSERT INTO Stories (author_id, title, body) VALUES ($1, $2, $3)'
            const values = [_id, title, body];
            const newStory = await db.query(query, values);

            console.log('new blog created: ', newStory.rows[0]);
            return next();
        } catch (error) {
            console.log(error);
            return next({
                log: 'Express error in createblog Middleware',
                status: 500,
                message: { err: 'An error occurred during blog-creation' },
            });
        }
    }

}

export default blogController;
