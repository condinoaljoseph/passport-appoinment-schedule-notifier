const qs = require('qs');
const https = require('https');
const path = require('path');
const cron = require('node-cron');
const axios = require('axios');
const notifier = require('node-notifier');
const open = require('open');
const rootCas = require('ssl-root-cas').create()

rootCas.addFile(path.resolve(__dirname, 'intermediate.pem'));
const httpsAgent = new https.Agent({ca: rootCas});

const data = qs.stringify({
	maxDate: '2021-11-30',
	requestDate: '2021-07-27',
	siteId: 17,
	slots: 1
});

const config = {
	method: 'post',
	url: 'https://www.passport.gov.ph/appointment/timeslot/available/next',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	data: data,
	httpsAgent
};

const task = cron.schedule('*/1 * * * *', () => {
	console.log(
		'Checking available dates on Cebu (Pacific Mall Metro Mandaue, Cebu) DFA Regional Consular Office – Cebu'
	);

	axios(config)
		.then(function (response) {
			console.log(response.data, ' api response');
			if (response.data.hasOwnProperty('Date')) {
				notifier.notify(
					{
						title: 'Passport Appointment Available',
						message: `Earliest Date Available: ${new Date(
							response.data.Date
						).toDateString()}`
					},
					() => open('https://www.passport.gov.ph/appointment')
				);
				task.stop();
			}

			console.log('no available date');
		})
		.catch(function (error) {
			console.log(error);
		});
});

console.log('running');
task.start();
