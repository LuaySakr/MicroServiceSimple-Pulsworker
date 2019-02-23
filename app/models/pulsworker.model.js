var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Pulsworker schema
var PulsworkerSchema = new Schema({
	pulsworker: String,
	completed: { type:Boolean, default: false },
	created_by: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
PulsworkerSchema.pre('save', function(next, done) {
	if(!this.pulsworker){
		next(new Error("pulsworker should not be null"));
	}
  	next();
});

var PulsworkerModel = mongoose.model('Pulsworker', PulsworkerSchema);

module.exports = PulsworkerModel;