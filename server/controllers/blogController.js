import db from '../models/dbConfig.js';

const blogController = {
  // create a blog
  async createBlog(req, res, next) {
    try {
      console.log('body: ', req.body);
      const { _id, title, body, tags } = req.body;
      const query =
        'INSERT INTO Stories (author_id, title, body) VALUES ($1, $2, $3) RETURNING *';
      const values = [_id, title, body];
      const newStory = await db.query(query, values);
      res.locals.tags = tags;
      res.locals.blogId = newStory.rows[0]._id;
      return next();
    } catch (error) {
      console.log(error);
      return next({
        log: 'Express error in createblog Middleware',
        status: 500,
        message: { err: 'An error occurred during blog-creation' },
      });
    }
  },
  // get blogs based on certain tags
  async setTags(req, res, next) {
    try {
      console.log('tags: ', res.locals.tags);

      const tagIDs = [];
      for (const tagValue of res.locals.tags) {
        // check if tag exists
        const tagQuery = 'SELECT _id from tags WHERE name = $1';
        const tagResult = await db.query(tagQuery, [tagValue]);

        if (tagResult.rows.length > 0) {
          // tag exists, so push into array
          tagIDs.push(tagResult.rows[0]._id);
        } else {
          // tag doesn't exist yet, so insert it and get the newly generated tag ID
          const newTagQuery =
            'INSERT INTO Tags (name, tag_type) VALUES ($1, $2) RETURNING _id';
          const newTagResult = await db.query(newTagQuery, [
            tagValue,
            'Interest',
          ]);
          tagIDs.push(newTagResult.rows[0]._id);
        }
      }

      // insert entries into blogtags table for each selected tag ID
      for (const tagID of tagIDs) {
        const blogTagQuery =
          'INSERT INTO Stories_tags (story_id, tag_id) VALUES ($1, $2)';
        const blogTagValues = [res.locals.blogId, tagID];
        await db.query(blogTagQuery, blogTagValues);
      }
      return next();
    } catch (error) {
      console.log(error);
      return next({
        log: 'Express error in createblog Middleware',
        status: 500,
        message: { err: 'An error occurred during tag-creation' },
      });
    }
  },

  async getCustomFeed(req, res, next) {
    try {
      const { tags } = req.body;
    } catch (error) {}
  },

  async getAllPosts(req, res, next) {
    try {
      const getAllPostsQuery =
        "SELECT s.*, STRING_AGG(t.name, ', ') AS tag_names FROM Stories s JOIN Stories_tags st ON s._id = st.story_id JOIN Tags t ON st.tag_id = t._id GROUP BY s._id order by s.creation_time desc;";
      const result = await db.query(getAllPostsQuery);
      console.log(result.rows);
      const storiesWithTags = result.rows.map((row) => ({
        _id: row._id,
        title: row.title,
        body: row.body,
        tag_names: row.tag_names,
        creation_time: row.creation_time,
      }));
      res.locals.allStories = storiesWithTags;
      return next();
    } catch (error) {
      console.log(error);
      return next({
        log: 'Express error in createblog Middleware',
        status: 500,
        message: { err: 'An error occurred during tag-creation' },
      });
    }
  },
};

export default blogController;
