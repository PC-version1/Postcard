import app from '../src/App.jsx';



describe('backend signup', () => {
    it('should be completed successfully'), () => {
        request(app)
            .post('/signup', JSON.stringify({
                "name": "testName",
                "username": "testUsername",
                "password": "testPassword",
                "email": "testEmail"
            }))
            .expect(res => {
                expect(200);
                expect(res.body.length).to.equal(5);
            })
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    }
})