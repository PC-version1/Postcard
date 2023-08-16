import db from '../models/dbConfig.js';
import bcrypt from 'bcrypt';

const userController = {
    // create user in database
    async createUser(req, res, next) {
        try {
            console.log('body: ', req.body)
            const { name, username, email, password, } = req.body;
            const hashedPass = await bcrypt.hash(password, 10);

            const query = 'INSERT INTO Users (name, username, hashed_pass, email) VALUES ($1, $2, $3, $4) RETURNING *'
            const values = [name, username, hashedPass, email];
            const newUser = await db.query(query, values);

            // log sign up
            console.log('New user signup: ', newUser.rows[0]);
            res.locals.newUser = newUser.rows[0];
            return next();
        } catch (error) {
            console.log(error);
            return next({
                log: 'Express error in createUser Middleware',
                status: 500,
                message: { err: 'An error occurred during sign-up' },
            });
        }
    },
    // login credential check
    async userLogin(req, res, next) {
        try {
            console.log('body: ', req.body);
            const { username, password } = req.body;
            const query = `SELECT * FROM users WHERE username = '${username}'`;
            const data = await db.query(query);

            res.locals.data = data.rows[0];
            const hashedPass = data.rows[0].hashed_pass;
            // boolean to return true or false depending if passwords match
            const passOk = await bcrypt.compare(password, hashedPass);

            // if password and hash password match, move along to next and send back a success response
            if (passOk) return next();
            // otherwise, bad request
            else {
                return next({
                    log: 'Failed credentials',
                    status: 400,
                    message: { err: 'Failed matching user credentials' },
                });
            }
        } catch (error) {
            console.error('Error during user login:', error);
            return next({
                log: 'Express error in userLogin Middleware',
                status: 500,
                message: { err: 'An error occurred during login' },
            });
        }
    },
}

export default userController;