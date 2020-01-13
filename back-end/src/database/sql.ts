

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
  //TODO: Clean up later.
  static async getAllSpeechesForASpecificUser(_username:String){
    return new Promise((resolve,reject) =>{
      var speeches_data : Array<Object> = [];
      SQL.getUser(_username).then(u =>{
        if(u != null){
          var user_id = u.id
          Models.Speeches.findAll({
            where: {
              user_id: user_id
            }
          }).then(async all_speeches => {
            for(const s of all_speeches){
              var speech_data = {
                id:Number,
                name:String,
                transcript:String,
                date_created:String,
                date_last_modified:String,
                error_count:Number
              }

              speech_data.id = s.id
              speech_data.name = s.title
              speech_data.transcript = s.transcript
              speech_data.date_created = s.createdAt
              speech_data.date_last_modified = s.last_edited
              speech_data.error_count = await Models.Errors.findAll({
                where: {
                  speech_id: s.id
                }
              })

              speeches_data.push(speech_data)
            }
            resolve({speeches:speeches_data})
          })
        }else{
          reject("User not found")
        }
      })
    })
  }
}

export default SQL;