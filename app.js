
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

app.post('/users/new', (req, res) => {
	const payload = req.body;
	db.users.set(db['id']++, payload);
	res.status(201).json(payload);
})

app.post('/taches/new', (req, res) => {
	const payload = req.body;
	db.taches.set(db['id']++, payload);
	res.status(201).json(payload);
})

module.exports = app;