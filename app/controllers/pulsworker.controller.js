"use strict";

var PulsworkerCtrl = function(Pulsworker){

	var PulsworkerObj = {};

	PulsworkerObj.PostPulsworker = function(req, res, next){
		var newPulsworker = new Pulsworker(req.body);
		newPulsworker.save(function(err, pulsworker){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, pulsworker: pulsworker});
		});
	}

	 PulsworkerObj.GetPulsworker = function(req, res, next){


		const vehicleownerHostPort="http://vehicleowner-api:7003/api/VehicleOwners"
		const request = require("request");
		const request2 = require("request");
		// var sleep = require('sleep');
var options = {

    uri: vehicleownerHostPort,

    method: 'GET'
	};

	request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
     
	//   console.log(JSON.parse(body).vehicleowner);
	  
	  JSON.parse(body).vehicleowner.forEach(element => {


		  // console.log("old  "+element.status)
		//   console.log("sucess")
		  // console.log(element)
		  // const delay = require('delay');
		  //  delay(1000);
		 var newstatus= Math.random() >= 0.5
		//  console.log("new  "+newstatus)
		// sleep.sleep(1);

  var options2 = {

    uri: vehicleownerHostPort+"/"+element.number,

    method: 'PUT',

    json: {

		_id:element._id,
      number: element.number,

      vehicleId: element.vehicleId,

	  customerNum: element.customerNum,
	  status:newstatus,
	  completed:element.completed

    }

  };



  console.log(options2.uri)
  request(options2, function (error, response2, body) {

    if (!error && response2.statusCode == 200) {
console.log("sucess")


//console.log(element)

	}
	else
	{
		console.log(response2.statusCode)
	}

  });


			  


	  });
    }
    else {
      console.log(error);
    }
  })







		Pulsworker.find(function(err, pulsworker){
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, pulsworker: pulsworker});
		});
	}

	PulsworkerObj.UpdatePulsworker = function(req, res, next){
		var completed = req.body.completed;
		Pulsworker.findById(req.params.pulsworker_id, function(err, pulsworker){
			pulsworker.completed = completed;
			pulsworker.save(function(err, pulsworker){
				if(err) {
					res.json({status: false, error: "Status not updated"});
				}
				res.json({status: true, message: "Status updated successfully"});
			});
		});
	}

	PulsworkerObj.DeletePulsworker = function(req, res, next){
		Pulsworker.remove({_id : req.params.pulsworker_id }, function(err, pulsworker){
			if(err) {
				res.json({status: false, error: "Deleting pulsworker is not successfull"});
			}
			res.json({status: true, message: "Pulsworker deleted successfully"});
		});
	}

	return PulsworkerObj;
}

module.exports = PulsworkerCtrl;
