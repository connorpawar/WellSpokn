

import * as Models from "./models";

class SQL{
  static softInitialize(){
    Models.default.sync({force:false});
  }
  static hardInitialize(){
    Models.default.sync({force:true});
  }

  static registerUser(_username:String,_password:String,_email:String){
    return Models.Users.create({
      username:_username,
      password:_password,
      email:_email
    });
  }
  static getUser(_username:String) : Promise<Models.Users>{
    return Models.Users.findOne({
      where: {
        username: _username
      }
    })
  }
  static createSpeech(_username:String,_title:String,_transcript:String) : Promise<Models.Speeches>{
    return new Promise((resolve,reject) =>{
      SQL.getUser(_username).then(u => {
        if(u == null){
          throw "User Not Found"
        }else{
          Models.Speeches.create({
            user_id:u.id,
            title: _title,
            last_edited: Models.default.literal('CURRENT_TIMESTAMP'),
            transcript: _transcript,
          }).then(s =>{
            resolve(s)
          })
        }
      })
    })
  }

  static massageSpeechData(rawSpeechData:Models.Speeches){
    var speech_data = {
      id:Number,
      name:String,
      transcript:String,
      date_created:String,
      date_last_modified:String,
      error_count:Number
    }
    speech_data.id = rawSpeechData.id
    speech_data.name = rawSpeechData.title
    speech_data.transcript = rawSpeechData.transcript
    speech_data.date_created = rawSpeechData.createdAt
    speech_data.date_last_modified = rawSpeechData.last_edited
    return speech_data
  }

  //TODO: Clean up later.
  static async getAllSpeechesForASpecificUser(_username:String){
    return new Promise(async (resolve,reject) =>{
      var speeches_data : Array<Object> = [];
      var user = await SQL.getUser(_username);
      try{
        if(user != null){
          var user_id = user.id
          var all_speeches = await Models.Speeches.findAll({
            where: {
              user_id: user_id
            }
          })
          for(const s of all_speeches){
            var errorsTask = Models.Errors.findAll({
              where: {
                speech_id: s.id
              }
            })
            var speech_data = this.massageSpeechData(s)
            speech_data.error_count = await errorsTask
            speeches_data.push(speech_data)
          }
          resolve({speeches:speeches_data})
        }else{
          throw "User not found";
        }
      }catch(e){
        reject(e)
      }
    })
  }

  static massageErrorData(rawErrorData:Models.Errors){
    var data = {
      type : String,
      start : Number,
      end : Number,
      description : String
    };

    data.type = rawErrorData.type;
    data.start = rawErrorData.start;
    data.end = rawErrorData.end;
    data.description = rawErrorData.description;
    return data;
  }

  static async getSpecificSpeech(_id:Number){
    return new Promise(async (resolve,reject) => {
      var speechTask = Models.Speeches.findOne({
        where: {
          id: _id
        }
      })

      var errorTask = Models.Errors.findAll({
        where: {
          speech_id: _id
        }
      })

      var attemptTask = Models.Attempts.findAll({
        where: {
          speech_id: _id
        }
      })

      var speechData = await speechTask;
      var errorData = await errorTask;
      var attemptData = await attemptTask;

      speechData.previous_attempts = attemptData.length-1
      speechData.errors_by_attempt = attemptData.map(e => {
        return JSON.parse(e.mapping)
      });

      speechData.latest_error_count = errorData.length
      speechData.errors = errorData.map(e => {
        return SQL.massageErrorData(e)
      });


      resolve(speechData)
    });
  }
}

export default SQL;