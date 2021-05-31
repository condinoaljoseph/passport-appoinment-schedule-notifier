# passport-appoinment-schedule-notifier
Notifies me when there is an available appointment schedule for passport on DFA regional office.

## Setting up
Make sure you have nodejs installed on your computer. Clone the repository. Then...

```bash
npm i
```

## Payload
You can see through `data.json` to know your site id and edit this code on `index.js`

```js
const data = qs.stringify({
	maxDate: '2021-11-30',
	requestDate: '2021-05-26',
	siteId: '17',
	slots: '3'
});
```

## Run

```bash
node index.js
```

