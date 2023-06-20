const express = require('express')
const bodyParser = require('body-parser')
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const app = express()
app.use(bodyParser.json());

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://ringer-d9eef-default-rtdb.firebaseio.com"
});

app.post('/', (req, res) => {
	const payload = req.body;
	console.log("from dev.dyte.io:-");
	console.log(payload);
	res.status(200).send('Success')
})

app.post("/onInitMeeting", (req, res) => {
	const {meeting, contact, caller} = req.body;
	console.log({meeting, contact, caller});

	const data = JSON.stringify({meeting, contact, caller});

	const message = {
		data: {payload: data},
		topic: 'activeMeeting',
	};

	admin
		.messaging()
		.send(message)
		.then(response => {
			console.log('Successfully sent message:', response);
		})
		.catch(error => {
			console.log('Error sending message:', error);
		});

	res.json({success: true})
})

app.listen(process.env.PORT || 3000)
