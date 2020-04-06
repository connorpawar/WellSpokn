

import * as Models from "./models";
import { resolve } from "dns";

class SQL{
  static softInitialize(){
    return Models.default.sync({force:false}).catch(e =>{
      console.log(e)
      process.exit(1);
    });
  }
  static hardInitialize(){
    return Models.default.sync({force:true}).catch(e =>{
      console.log(e)
      process.exit(1);
    });
  }

  static registerUser(_email:String,_firstname:String,_lastname:String,_password:String){
    return Models.Users.create({
      firstname: _firstname,
      lastname: _lastname,
      password:_password,
      email:_email
    });
  }
  static getSpeechDataById(_user_id : Number, _speech_id:Number) : Promise<any>{
    return new Promise((resolve,reject) => {
      Models.Speeches.findOne({
        where: {
          user_id : _user_id,
          id: _speech_id
        }
      }).then(s =>{
        //TODO: Attach Error and Attempt data onto this.
        resolve(this.massageSpeechDataForViewing(s))
      }).error(e =>{
        reject(e)
      })
    }) 
  }
  static getUserById(_id:Number) : Promise<Models.Users>{
    return Models.Users.findOne({
      where: {
        id: _id
      }
    })
  }
  static getUser(_email:String) : Promise<Models.Users>{
    return Models.Users.findOne({
      where: {
        email: _email
      }
    })
  }
  static createSpeech(_email:String,_title:String,_transcript:String) : Promise<Models.Speeches>{
    return new Promise((resolve,reject) =>{
      SQL.getUser(_email).then(u => {
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

  static massageSpeechDataForViewing(rawSpeechData:Models.Speeches){
    var speech_data = {
      id:-1,
      name:String,
      transcript:String,
      date_created:String,
      date_last_modified:String,
      error_count:Number
    }
    speech_data.id = rawSpeechData.id
    speech_data.name = rawSpeechData.title
    speech_data.transcript = rawSpeechData.transcript
    speech_data.date_created = rawSpeechData.createdAt.toISOString().substring(0, 10)
    speech_data.date_last_modified = rawSpeechData.last_edited.toISOString().substring(0, 10)
    return speech_data
  }

  static massageSpeechDataForPreview(rawSpeechData:Models.Speeches,allErrors:Array<Models.Errors>){
    //Needs cleanup.
    type speech_preview = {
      id:number,
      name:String,
      transcript_preview:String,
      date_created:String,
      date_last_modified:String,
      error_count : number
    }
    var speech_preview_data : speech_preview = {
      id:null,
      name:null,
      transcript_preview:null,
      date_created:null,
      date_last_modified:null,
      error_count : null
    };
    speech_preview_data.id = rawSpeechData.id
    speech_preview_data.name = rawSpeechData.title
    if(rawSpeechData.transcript.length > 125){
      speech_preview_data.transcript_preview = rawSpeechData.transcript.substring(0, 126)+"..."
    }else{
      speech_preview_data.transcript_preview = rawSpeechData.transcript
    }
    speech_preview_data.date_created = rawSpeechData.createdAt.toISOString().substring(0, 10)
    speech_preview_data.date_last_modified = rawSpeechData.last_edited.toISOString().substring(0, 10)
    speech_preview_data.error_count = allErrors.length
    return speech_preview_data
  }

  //TODO: Clean up later.
  static async getAllSpeechesForASpecificUser(_email:String){
    return new Promise(async (resolve,reject) =>{
      var speeches_data : Array<Object> = [];
      var user = await SQL.getUser(_email);
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
            var all_errors = await errorsTask
            var speech_data = this.massageSpeechDataForPreview(s,all_errors)
            //TODO: Does this work?
            speeches_data.push(speech_data)
          }
          resolve({speeches:speeches_data})
        }else{
          throw "User not found";
        }
      }catch(e){
        console.log(e)
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

  static async addError(_speech_id:Number,_type:String,_start:Number,_end:Number,_description:String){
    //TODO: Check if speech exists first.
    return Models.Errors.create({
      speech_id:_speech_id,
      type:_type,
      start:_start,
      end: _end,
      description:_description,
    });
  }

  static async finalizeAttempt(_speech_id:Number){
    //TODO: Check if speech exists first.
    return Models.Errors.findAll({where:{speech_id:_speech_id}}).then(errors =>{
      var attemptData = {};
      errors.forEach(err => {
        if(attemptData[err.type] == undefined){
          attemptData[err.type] = 1
        }else{
          attemptData[err.type] += 1
        }
      });
      Models.Attempts.create({mapping:JSON.stringify(attemptData),speech_id:_speech_id})
    });
  }
}

export default SQL;