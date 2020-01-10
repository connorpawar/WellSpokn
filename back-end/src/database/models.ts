const config = require('config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.get('Database'))

export class Users extends Sequelize.Model{}
Users.init({
  username: {type: Sequelize.STRING, unique:"username"},
  password: Sequelize.STRING,
  email: Sequelize.STRING,
},
{
  sequelize,
  modelName: 'user'
})

export class Speeches extends Sequelize.Model{}
Speeches.init({
  title: Sequelize.STRING,
  last_edited: Sequelize.DATE,
  transcript: Sequelize.TEXT("long"),
  user_id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references: {
      model:Users,
      key:'id',
    }
  },
},
{
  sequelize,
  modelName : 'speech'
});

export class Errors extends Sequelize.Model{}
Errors.init({
  type: Sequelize.STRING,
  start: Sequelize.INTEGER,
  end: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  speech_id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references: {
      model:Speeches,
      key:'id',
    }
  },
},
{
  sequelize,
  modelName : 'error'
});

export class Attempts extends Sequelize.Model{}
Attempts.init({
  grammar: Sequelize.INTEGER,
  total_errors: Sequelize.INTEGER,
  grammar_errors: Sequelize.INTEGER,
  redundancy_errors: Sequelize.INTEGER,
  diction_errors: Sequelize.INTEGER,
  repetition_errors: Sequelize.INTEGER,
  speech_id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references: {
      model:Speeches,
      key:'id',
    }
  },
},
{
  sequelize,
  modelName : 'attempt'
});

export default sequelize;