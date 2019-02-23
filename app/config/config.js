var config = {
	port: process.env.PORT || 7005,
	db: process.env.MONGOLAB_URI || "mongodb://mongodb/pulsworker",
	test_port: 8005,
	test_db: "mongodb://mongodb/pulsworkerapi_test"
}
module.exports = config;