
const express = require('express');
const app = express();
const db = require("./db");

const mapToObj = (m) => {
	return Array.from(m).reduce((obj, [key, value]) => {
	  obj[key] = value;
	  return obj;
	}, {});
};

app.use(express.json());

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

app.post('/users', (req, res) => {
	const payload = req.body;
	db.users.set(db['id']++, payload);
	res.status(201).json(payload);
})

app.post('/taches', (req, res) => {
	const payload = req.body;
	db.taches.set(db['id']++, payload);
	res.status(201).json(payload);
})

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

module.exports = app;