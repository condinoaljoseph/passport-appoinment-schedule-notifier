const qs = require('qs');
const cron = require('node-cron');
const axios = require('axios');
const notifier = require('node-notifier');

const data = qs.stringify({
	maxDate: '2021-11-30',
	requestDate: '2021-05-26',
	siteId: '17',
	slots: '3'
});

const config = {
	method: 'post',
	url: 'https://www.passport.gov.ph/appointment/timeslot/available/next',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	data: data
};

const task = cron.schedule('*/10 * * * *', () => {
	console.log(
		'Checking available dates on Cebu (Pacific Mall Metro Mandaue, Cebu) DFA Regional Consular Office – Cebu'
	);

	axios(config)
		.then(function (response) {
			if (response.data.hasOwnProperty('Date')) {
				notifier.notify({
					title: 'Passport Appointment Available',
					message: `Earliest Date Available: ${new Date(
						response.data.Date
					).toDateString()}`
				});
				task.stop();
			}
		})
		.catch(function (error) {
			console.log(error);
		});
});

task.start();
