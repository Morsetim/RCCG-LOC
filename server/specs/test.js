import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const {expect} = chai;
const request = supertest(app);

describe('All test cases for RCCG-LOC application', () => {
  describe('test case for loading application home page', () => {
    it('Should load application home page', (done) => {
      request.get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'Welcome RCCG-LOC Youth & Young Adult Church'
          });
          if (err) done(err);
          done();
        });
    });
  });
  describe('All test cases for application invalid routes', () => {
    it('should fail to load application home page', (done) => {
      request.get('/home')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'Page Not Found'
          });
          if (err) done(err);
          done();
        });
    });
    it('Should fail to get route', (done) => {
      request.get('/api/v2')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'Page Not Found'
          });
          if (err) done(err);
          done();
        });
    });
});
describe('All test case for Members', () =>{
  describe('All test case for Member Sign up', () =>{
    it('Create a new member', (done) =>{
      const member = {
        fullname: 'Shade Bisili',
        email: 'mricbbuuniu@yahoo.com',
        password: 'qwerty'
      };
      request.post('/api/v2/signUp/auth')
      .send(member)
      .expect(201)
      .end((err, res) =>{
        expect('Success').to.equal(res.body.status);
        expect('Successfully created RCCG-LOC account').to.equal(res.body.message);
        expect('Shade Bisili').to.equal(res.body.memberData.fullname);
        expect('mricbbuuniu@yahoo.com').to.equal(res.body.memberData.email);
        if(err) done(err);
        done();
      })
    });
    it('Should not create a new member', (done) =>{
      const member = {
        fullname: 'Shade Bisili',
        email: 'mricbbuuniu@yahoo.com',
        password: 'qwerty'
      };
      request.post('/api/v2/signUp/auth')
      .send(member)
      .expect(409)
      .end((err, res) =>{
        expect('Failed').to.equal(res.body.status);
        expect('User Already Exist').to.equal(res.body.message);
        if(err) done(err);
        done();
      })
    });
    it('Should Sign up a new user', (done) =>{
      request.post('/api/v2/signUp/auth')
        .send({
          fullname: '4553ajj',
          password: '34we',
          email: 'ma77.com'
        })
        .expect(400)
        .end((err, res) =>{
          expect(res.body.checkers.fullname).to.equal('Field must be an Alphabet');
          expect(res.body.checkers.password).to.equal('Password too short');
          expect(res.body.checkers.email).to.equal('Field must be an Email');
          if(err) done(err)
          done();
        });
    });
    it('Should Sign up a new user', (done) =>{
      request.post('/api/v2/signUp/auth')
        .send({})
        .expect(400)
        .end((err, res) =>{
          expect(res.body).to.deep.equal({message:'All/Some fields are empty'});
          if(err) done(err);
          done();
        });
    });
    it('Should Sign up a new user', (done) =>{
      request.post('/api/v2/signUp/auth')
        .send({
          fullname: '',
          password: '',
          email: ''
        })
        .expect(400)
        .end((err, res) =>{
          expect(res.body.checkers.fullname).to.equal('Field must not be empty');
          expect(res.body.checkers.password).to.equal('Password field is required');
          expect(res.body.checkers.email).to.equal('Email field is empty');
          if(err) done(err)
          done();
        });
    });
  });
  describe('All test case for member Sign In', () =>{
    it('should not Login  a new user and return a `500`', (done) => {
      request.post('/api/v2/signIn/auth')
        .send({
          email: 'wronguser@2ss.hh',
          password: '12345678'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.status).to.equal('Failed');
          expect(res.body.message).to.equal('Invalid Email or Password');
          done();
        });
    });
    it('should  not login new user account and return a `400`', (done) => {
      request.post('/api/v2/signIn/auth')
        .send({})
        .expect(401)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'All or Some fields are Empty',
            status: "Failed"
          });
          done();
        });
    });
    it('should  not login a new user account and return a `400`', (done) => {
      request.post('/api/v2/signIn/auth')
        .send({
          email: '',
          password: ''
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.checkers2.email).to.equal('Email field cannot be Empty');
          expect(res.body.checkers2.password).to.equal('Password field is Empty');
          done();
        });
    });
    it('should  not login a new user account and return a `400`', (done) => {
      request.post('/api/v2/signIn/auth')
        .send({
          email: 'h',
          password: 'dddd'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.checkers2.email).to.equal('Field must be an Email');
          expect(res.body.checkers2.password).to.equal('Password must be  atleast eight characters');
          done();
        });
    });
    it('should Login  a new user and return a `201`', (done) => {
      const userInfo = {
        email: 'mricbbuuniu@yahoo.com',
        password: 'qwerty'
      };
      request.post('/api/v2/signIn/auth')
        .send(userInfo)
        .expect(201)
        .end((err, res) => {
          // tokenValue = res.body.token;
          console.log(res.body,'=======================================')

          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Successfully signed in');
          // expect(res.body.data.username).to.equal('hnobi');
          // expect(res.body.data.email).to.equal('hnobi09@yahoo.com');
          done();
        });
    });
  });
});
});


