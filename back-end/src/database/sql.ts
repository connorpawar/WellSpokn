

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
  static getUser(_username:String){
    return Models.Users.findOne({
      where: {
        username: _username
      }
    })
  }
  static createSpeech(_username:String,_title:String,_transcript:String) : Models.Speeches{
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
  static getAllSpeechesForASpecificUser(_username:String){
    return new Promise((resolve,reject) =>{
      var requested_data = {
        transcript:String,
        attempts:Array,
        errors:Array
      };
      SQL.getUser(_username).then(u =>{
        if(u != null){
          var user_id = u.id
          Models.Speeches.findAll({
            where: {
              user_id: user_id
            }
          }).then(all_speeches => {
            var all_promises = []
            for(const s of all_speeches){
              requested_data[s.id] = {}
              requested_data[s.id].transcript = s.transcript
    
              var a = Models.Attempts.findAll({
                where: {
                  speech_id: s.id
                }
              }).then(a =>{
                requested_data[s.id].attempts = a
              })
              
              var e = Models.Errors.findAll({
                where: {
                  speech_id: s.id
                }
              }).then(e =>{
                requested_data[s.id].errors = e
              })
    
              all_promises.push(a)
              all_promises.push(e)
            }
            Promise.all(all_promises).then(() => {
              resolve(requested_data)
            })
          })
        }else{
          reject("User not found")
        }
      })
    })
  }
}

export default SQL;