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
            .then((connection) => {
                let data = {
                    Name: "test1",
                    City: "testing1",
                    Category: "tester1",
                    Address: "tes1"
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
                    .then((res) => {
                        agent
                            .post('/api/v1/places')
                            .send(data2)
                            .then((res) => {
                                done();
                            })
                    })

            })
            .catch(function (err) {
                throw err;
            })
    })

    describe('DATABASE TESTS', () => {

        it('should get all the places from the database', (done: any) => {
            agent
                .get('/api/v1/places')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.places.should.be.a('array');
                    res.body.places.length.should.be.eql(2);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it('should get a place by name and print out the details about the place', (done: any) => {
            agent
                .get('/api/v1/places/test1')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.place.should.be.a('object');
                    res.body.place.Name.should.equal('test1');
                    done();
                }).catch(function (err) {
                    throw err;
                });
        });

        it('should return msg : Place does not exist, add it; when place is not in the databse', (done: any) => {
            agent
                .get('/api/v1/places/town')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.place.should.equal('Place does not exist, add it!');
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it('should update place from the database and return the updated place', (done: any) => {
            agent
                .put('/api/v1/places/test1/update')
                .send({
                    Address: "tes0"
                })
                .then((res) => {
                    res.should.have.status(200);
                    done();
                })
                .catch(function (err) {
                    throw err;
                })
        });

        it('should remove place from the database and return length of items decremented by one', (done: any) => {
            agent
                .delete('/api/v1/places/test1/delete')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.places.should.be.a('array');
                    res.body.places.length.should.be.eql(1);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });

    });

    after((done) => {
        let PlaceRepo = getRepository(Place);
        PlaceRepo.query("DELETE FROM place WHERE name = 'test1' AND name = 'test2'");
        done();
    });

});