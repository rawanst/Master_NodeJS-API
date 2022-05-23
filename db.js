db = {
  users: new Map(),
  taches: new Map(),
  id:0

}

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

module.exports = db

