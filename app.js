
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

module.exports = app;