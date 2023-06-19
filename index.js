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
	console.log(payload);
	res.status(200).send('Success')
})

app.listen(process.env.PORT || 3000)
