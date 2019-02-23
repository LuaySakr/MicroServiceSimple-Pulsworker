var Pulsworker = require('../models/pulsworker.model');
var PulsworkerController = require('../controllers/pulsworker.controller')(Pulsworker);

module.exports = function(app){

	app.get('/api/pulsworkers', PulsworkerController.GetPulsworker);
	
	app.post('/api/pulsworkers', PulsworkerController.PostPulsworker);

	app.put('/api/pulsworkers/:pulsworker_id', PulsworkerController.UpdatePulsworker);

	app.delete('/api/pulsworkers/:pulsworker_id', PulsworkerController.DeletePulsworker);

}