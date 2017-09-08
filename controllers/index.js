module.exports = function(app) {
	require('./landing_controller.js')(app);
	require('./scrape_controller.js')(app);
	require('./saved_controller.js')(app);
};
