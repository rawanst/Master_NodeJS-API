const request = require("supertest");
const db = require("../db");
const app = require("../app");
const mapToObj = (m) => {
  return Array.from(m).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
};

describe("Mon API CRUD", () => {

  beforeEach(()=>{
    db['taches'] = new Map();
    db['users'] = new Map();
    db['id'] = 0;
    db['taches'].set(db['id']++, {
      description: 'test',
      faite: true })
    db['taches'].set(db['id']++, {
      description: 'test 2',
      faite: false })
    db['users'].set(db['id']++, {
      email: 'test@test.com',
      username: 'test',
      motdepasse: '098f6bcd4621d373cade4e832627b4f6'
    })
    db['users'].set(db['id']++, {
      email: 'test2@test2.com',
      username: 'test2',
      motdepasse: '098f6bcd4621d373cade4e832627b4f6'
    })

    it("GET /taches retourne JSON table taches de la BD", async() => {
      const res = await request(app)
        .get('/taches')
        .expect(200)
        .expect("content-type", /json/);
      expect(JSON.parse(res.text)).toMatchObject(mapToObj(db.taches));
    })

    it("GET /taches/:id retourne le JSON de l'objet correspondant en DB", async () => {
      const res = await request(app)
        .get("/taches/1")
        .expect(200)
        .expect("content-type", /json/);
      expect(JSON.parse(res.text)).toMatchObject(db.taches.get(1));
    });

    it("GET /users retourne JSON table users de la BD", async() => {
      const res = await request(app)
        .get('/users')
        .expect(200)
        .expect("content-type", /json/);
      expect(JSON.parse(res.text)).toMatchObject(mapToObj(db.users));
    })
    
    it("GET /users/:id retourne le JSON de l'objet correspondant en DB", async () => {
      const res = await request(app)
        .get("/users/1")
        .expect(200)
        .expect("content-type", /json/);
      expect(JSON.parse(res.text)).toMatchObject(db.users.get(1));
    });

  })
})