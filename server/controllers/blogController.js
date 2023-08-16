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
      const tags = [req.body.tags];
      console.log('tags looks like this: ', tags);

      const query =
        'SELECT stories_tags.story_id, stories_tags.tag_id, stories.title, stories.body, tags.name, users.username, stories.creation_time FROM "public"."stories_tags" join stories on stories_tags._id = stories._id join tags on stories_tags.tag_id = tags._id Join users on stories.author_id = users._id WHERE stories_tags.tag_id IN ($1) ORDER BY creation_time DESC LIMIT 100;';
      const resultPosts = await db.query(query, tags);

      // console.log('resultPosts looks like this: ', resultPosts);

      res.locals.customFeed = [];
      const postsCounted = [];
      resultPosts.rows.forEach((post) => {
        // if story is new (not in postsCounted)
        // modify tags "name" to array containing original string contents
        // push story to array
        // push story_id to postsCounted
        if (!postsCounted.includes(post.story_id)) {
          post.tagNames = [post.name];
          res.locals.customFeed.push(post);
          postsCounted.push(post.story_id);
        }

        // else if story is already in postsCounted
        // find story with matching id in res.locals array
        // push tags "name" to story tags array
        else {
          res.locals.customFeed.forEach((existingPost) => {
            if (existingPost.story_id === post.story_id)
              existingPost.tagNames.push(post.name);
          });
        }
      });
      return next();
    } catch (error) {
      console.log(error);
      return next({
        log: 'Express error in getCustomFeed Middleware',
        status: 500,
        message: { err: 'An error occurred while fetching custom feed' },
      });
    }
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

  //   async getAllPosts(req, res, next) {
  //     try {
  //       // const { tags } = req.body;
  //       const generalFeedPosts = await db.query(
  //         'SELECT stories_tags.story_id, stories_tags.tag_id, stories.title, stories.body, tags.name, users.username, stories.creation_time FROM "public"."stories_tags" join stories on stories_tags._id = stories._id join tags on stories_tags.tag_id = tags._id Join users on stories.author_id = users._id ORDER BY creation_time DESC LIMIT 100;'
  //       );

  //       res.locals.generalFeed = [];
  //       const postsCounted = [];
  //       generalFeedPosts.rows.forEach((post) => {
  //         // if story is new (not in postsCounted)
  //         // modify tags "name" to array containing original string contents
  //         // push story to array
  //         // push story_id to postsCounted
  //         if (!postsCounted.includes(post.story_id)) {
  //           post.tagNames = [post.name];
  //           res.locals.generalFeed.push(post);
  //           postsCounted.push(post.story_id);
  //         }

  //         // else if story is already in postsCounted
  //         // find story with matching id in res.locals array
  //         // push tags "name" to story tags array
  //         else {
  //           res.locals.generalFeed.forEach((existingPost) => {
  //             if (existingPost.story_id === post.story_id)
  //               existingPost.tagNames.push(post.name);
  //           });
  //         }
  //       });

  //       console.log(res.locals.generalFeed);
  //       return next();
  //     } catch (error) {
  //       console.log(error);
  //       return next({
  //         log: 'Express error in getAllFeed Middleware',
  //         status: 500,
  //         message: { err: 'An error occurred while fetching general feed' },
  //       });
  //     }
  //   },
};

export default blogController;
