"use strict";

var should = require('should'),
	request = require('supertest'),
	app = require('../../server.js'),
	mongoose = require('mongoose'),
	Pulsworker = mongoose.model('Pulsworker'),
	agent = request.agent(app);

describe('Pulsworker CRUD integration testing', function () {

	describe('Get all pulsworker', function () {

		before(function (done) {
			var newPulsworker = { pulsworker: "Pulsworker from hooks" };
			agent
			.post('/api/pulsworkers')
			.end(function(){
				done();
			})
		});

		it('Should get status equal success and array of pulsworker', function (done) {
			agent
			.get('/api/pulsworkers')
			.expect(200)
			.end(function(err, results){
				results.body.status.should.equal(true);
				done();
			});
		});
		
	});
	
	describe('Post a pulsworker', function () {
		it('Should allow post to post a pulsworker and return _id', function (done) {
			var params = { pulsworker: "Pulsworker fro testing" };
			agent
			.post('/api/pulsworkers')
			.send(params)
			.expect(200)
			.end(function(err, results){
				results.body.pulsworker.completed.should.equal(false);
				results.body.pulsworker.should.have.property('_id');
				done();
			});
		});
	});
	
	describe('Delete a pulsworker', function () {
		var id;
		before(function (done) {
			var params = { pulsworker: "Pulsworker from hooks to delete" };
			agent
			.post('/api/pulsworkers')
			.send(params)
			.end(function(err, result){
				id = result.body.pulsworker._id;
				done();
			})
		});

		it('Should delete the pulsworker by _id', function (done) {
			agent
			.delete('/api/pulsworkers/'+id)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});

	});

	describe('Update a pulsworker', function () {
		var id;
		before(function (done) {
			var newPulsworker = { pulsworker: "Pulsworker from hooks to update" };
			agent
			.post('/api/pulsworkers')
			.send(newPulsworker)
			.end(function(err, result){
				id = result.body.pulsworker._id;
				done();
			})
		});

		it('Should update the completed status of pulsworker by _id to true', function (done) {
			var params = { completed: true };
			agent
			.put('/api/pulsworkers/'+id)
			.send(params)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});
	});

});

