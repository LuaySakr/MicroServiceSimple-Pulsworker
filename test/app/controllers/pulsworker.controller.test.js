"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

var PulsworkerModel = require('../../../app/models/pulsworker.model');

describe('PulsworkerController testing', function () {

	describe('Pulsworker Post test', function () {
		
		it('Should call save only once', function () {
			var saveStub = sinon.stub();
			function Book(){
				this.save = saveStub
			}
			var req = {
				body: {
					pulsworker: "Test pulsworker from mock"
				}
			}
			var res = {}, next = {};
			var PulsworkerController = require('../../../app/controllers/pulsworker.controller')(Book);
			PulsworkerController.PostPulsworker(req, res, next);
			sinon.assert.calledOnce(saveStub);
		});

		it('Should save pulsworker', function (done) {
			var pulsworkerMock = sinon.mock(new PulsworkerModel({ pulsworker: 'Save new pulsworker from mock'}));
			var pulsworker = pulsworkerMock.object;

			pulsworkerMock
			.expects('save')
			.yields(null, 'SAVED');

			pulsworker.save(function(err, result) {
				pulsworkerMock.verify();
				pulsworkerMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});

	});

	describe('Get all Pulsworker test', function () {
		it('Should call find once', function (done) {
			var PulsworkerMock = sinon.mock(PulsworkerModel);
			PulsworkerMock
			.expects('find')
			.yields(null, 'PulsworkerS');

			PulsworkerModel.find(function (err, result) {
				PulsworkerMock.verify();
				PulsworkerMock.restore();
				should.equal('PulsworkerS', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Delete pulsworker test', function () {
		it('Should delete pulsworker of gived id', function (done) {
			var PulsworkerMock = sinon.mock(PulsworkerModel);

			PulsworkerMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');

			PulsworkerModel.remove({_id: 12345}, function(err, result){
				PulsworkerMock.verify();
				PulsworkerMock.restore();
				done();
			})


		});
	});

	describe('Update a pulsworker', function () {
		it('Should update the pulsworker with new value', function (done) {
			var pulsworkerMock = sinon.mock(new PulsworkerModel({ pulsworker: 'Save new pulsworker from mock'}));
			var pulsworker = pulsworkerMock.object;

			pulsworkerMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');

			pulsworker.save({_id: 12345}, function(err, result){
				pulsworkerMock.verify();
				pulsworkerMock.restore();
				done();
			})

		});
	});

});