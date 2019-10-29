// // const Pool = require('pg').Pool
// // const pool = new Pool({
// // //   user: 'me',
// // //   host: 'localhost',
// // //   database: 'api',
// // //   password: 'password',
// // //   port: 5432,
// // })

// // pool.connect(function(err) {
// // 	if (err) throw err;
// // });
  
// module.exports = pool;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('test','postgres','pw',{
  host: 'localhost',
  dialect: 'postgres'
})

class Users extends Sequelize.Model{}
Users.init({
  username: {type: Sequelize.STRING, unique:"username"},
  password: Sequelize.STRING,
  email: Sequelize.STRING,
},
{
  sequelize,
  modelName: 'user'
})

class Speeches extends Sequelize.Model{}
Speeches.init({
  title: Sequelize.STRING,
  last_edited: Sequelize.DATE,
  transcript: Sequelize.TEXT(length="long"),
},
{
  sequelize,
  modelName : 'speech'
});

class Errors extends Sequelize.Model{}
Errors.init({
  grammar: Sequelize.INTEGER,
  redundancy: Sequelize.INTEGER,
  diction: Sequelize.INTEGER,
  repetition: Sequelize.INTEGER,
},
{
  sequelize,
  modelName : 'error'
});

class Attempts extends Sequelize.Model{}
Attempts.init({
  grammar: Sequelize.INTEGER,
  total_errors: Sequelize.INTEGER,
  grammar_errors: Sequelize.INTEGER,
  redundancy_errors: Sequelize.INTEGER,
  diction_errors: Sequelize.INTEGER,
  repetition_errors: Sequelize.INTEGER,
},
{
  sequelize,
  modelName : 'attempt'
});


Speeches.belongsTo(Users)
Users.hasMany(Speeches)

Errors.belongsTo(Speeches)
Speeches.hasMany(Errors)

Attempts.belongsTo(Speeches)
Speeches.hasMany(Attempts)

sequelize.sync({force:true});

/*
sequelize.sync({force:true}).then(() => {
  return Users.create({
    username:"Sherman",
    password:"pw",
    email:"s423c051@ku.edu"
  }).then(u => {
    return Speeches.create({
      title: "Dinner or song?",
      last_edited: "2019-1-1",
      transcript: "WHAT A PERFECT GUY.",
    }).then(s => {
      u.addSpeeches(s)
    });
  });
});
*/
class SQL{
  static registerUser(_username,_password,_email){
    return Users.create({
      username:_username,
      password:_password,
      email:_email
    });
  }
  static getUser(_username){
    return Users.findOne({
      where: {
        username: _username
      }
    })
  }
  static createSpeech(_username,_title,_transcript){
    return Users.findOne({
      where: {
        username: _username
      }
    }).then(u => {
      if(u == null){
        throw "User Not Found"
      }else{
        Speeches.create({
          title: _title,
          last_edited: sequelize.literal('CURRENT_TIMESTAMP'),
          transcript: _transcript,
        });
      }
    })
  }
}

module.exports = SQL