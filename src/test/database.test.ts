process.env.NODE_ENV = 'test';
import * as assert from 'assert';
import connection from '../config/connection';
import {
    Place
} from '../entity/Place.entity';
import {
    getManager,
    createConnection,
    getConnection,
    getRepository
} from 'typeorm';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();

chai.use(chaiHttp);

var agent = chai.request.agent(server);

describe('', () => {

    before((done: any) => {
        createConnection(connection)
            .then( (connection) => {
                let data = {
                    Name: "test",
                    City: "testing",
                    Category: "tester",
                    Address: "tes"
                }

                let data2 = {
                    Name: "test2",
                    City: "testing2",
                    Category: "tester2",
                    Address: "tes2"
                }
    
                agent
                    .post('/api/v1/places')
                    .send(data)
                    .then( (res) => {})

                agent
                    .post('/api/v1/places')
                    .send(data2)
                    .then( (res) => {})
                })
                done();
    })

    describe('DATABASE TESTS', () => {

        it('should get all the places from the database', (done: any) => {
            agent
                .get('/api/v1/places')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.places.should.be.a('array');
                    res.body.places.length.should.be.eql(2);
                    done();
                });
        });

        it('should get a place by name and print out the details about the place', (done: any) => {
            agent
                .get('/api/v1/places/test')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.place.should.be.a('object');
                    res.body.place.Name.should.equal('test');
                    done();
                });
        });

        it('should return msg : Place does not exist, add it; when place is not in the databse', (done: any) => {
            agent
                .get('/api/v1/places/town')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.place.should.equal('Place does not exist, add it!');
                    done();
                });
        });

    });

    after( (done) => {
        let PlaceRepo = getRepository(Place);
        PlaceRepo.query("DELETE FROM place WHERE name = 'test' AND name = 'test2'");
        done();
    });

});