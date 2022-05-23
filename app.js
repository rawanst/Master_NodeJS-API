
const express = require('express');
const app = express();
const db = require("./db");
// const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi)
// const jwt = require("jsonwebtoken");
// require('dotenv').config();

// const userSchema = new mongoose.Schema({
// 	email: String().require().email(),
// 	username: String().require().min(3),
// 	motdepasse: String().require().min(3)
// });

// const tacheSchema = new mongoose.Schema({
// 	description: String().require(),
// 	faite: Boolean().require(),
// });

const mapToObj = (m) => {
	return Array.from(m).reduce((obj, [key, value]) => {
	  obj[key] = value;
	  return obj;
	}, {});
};

app.use(express.json());

// app.post('/account', (req, res) => {
// 	const token2 = jwt.sign({userId: 13}, process.env.SECRET_JWT);

// 	const header = token.split('.')[0];
// 	const payload = token.split('.')[1];
// 	const signature = token2.split('.')[2];

// 	const fakeToken = header +"."+ payload +"."+ signature
// 	console.log("FAKE TOKEN : ", fakeToken);


// 	try {
// 	const failedVerification = jwt.verify(fakeToken, process.env.SECRET_JWT);
// 	}catch(exc){
// 	console.log('echec de la vérification du Faux Token : PAS LA BONNE SIGNATURE');
// 	}
// })

// Routes GET
app.get('/taches', (req, res) => {
	res.json(mapToObj(db.taches));
})

app.get('/taches/:id', (req, res) => { 
	let id = parseInt(req.params.id)
	res.json(db.taches.get(id));
})

app.get('/users', (req, res) => {
	res.json(mapToObj(db.users));
})

app.get('/users/:id', (req, res) => { 
	let id = parseInt(req.params.id)
	res.json(db.users.get(id));
})

// Routes POST
app.post('/users', (req, res) => {
	const payload = req.body;
	// if(userSchema.validateAsync(payload)){
	// 	db.users.set(db['id']++, payload);
	// 	res.status(201).json(payload);
	// }
	db.users.set(db['id']++, payload);
	res.status(201).json(payload);
})

app.post('/taches', (req, res) => {
	const payload = req.body;
	db.taches.set(db['id']++, payload);
	res.status(201).json(payload);
})

// Routes POST
app.put('/users/:id', (req, res) => {
	let id = parseInt(req.params.id)
	const payload = req.body;
	db.users.set(id, payload);
	res.status(204).send();
})

app.put('/taches/:id', (req, res) => {
	let id = parseInt(req.params.id)
	const payload = req.body;
	db.taches.set(id, payload);
	res.status(204).send();
})

// Routes DELETE
app.delete('/users/:id', (req, res) => {
	let id = parseInt(req.params.id)
	res.json(db.users.delete(id));
})

app.delete('/taches/:id', (req, res) => {
	let id = parseInt(req.params.id)
	res.json(db.taches.delete(id));
})

module.exports = app;