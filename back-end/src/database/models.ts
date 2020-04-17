const config = require('config');
var Sequelize = require('sequelize');
var sequelize;

sequelize = new Sequelize(config.get('DATABASE'))

export class Users extends Sequelize.Model{}
Users.init({
  firstname: {type: Sequelize.STRING},
  lastname: {type: Sequelize.STRING},
  password: Sequelize.STRING,
  email: {type: Sequelize.STRING, unique:"email"}
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
  mapping: Sequelize.TEXT,
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