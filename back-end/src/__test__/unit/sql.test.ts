const path = require('path')


jest.mock('../../database/models')

import SQL from '../../database/sql';
import * as Models from '../../database/models'


function resolveWrap(arg){
    return new Promise((resolve,reject) =>{
        resolve(arg)
    })
}

describe('sql module', () => {
    test("softInitialize", () => {
        SQL.softInitialize();
        expect(Models.default.sync).toBeCalledWith({force:false})
        expect(Models.default.sync).toBeCalledTimes(1)
    })

    test("hardInitialize", () => {
        SQL.hardInitialize();
        expect(Models.default.sync).toBeCalledWith({force:true})
        expect(Models.default.sync).toBeCalledTimes(1)
    })

    test("registerUser", () => {
        var _username : string = "dan";
        var _password : string = "p@ssW0rd";
        var _email : string = "something@somewhere.com";

        SQL.registerUser(_username,_password,_email);

        expect(Models.Users.create).toBeCalledWith({
            username:_username,
            password:_password,
            email:_email
        });
        expect(Models.Users.create).toBeCalledTimes(1)
    })

    test("getUser", async (done) => {
        var _username : string = "dan";

        await SQL.getUser(_username);

        expect(Models.Users.findOne).toBeCalledWith({
            where:{
                username:_username
            }
        });
        expect(Models.Users.findOne).toBeCalledTimes(1)
        done()
    })

    test("createSpeech", async (done) => {
        var _username : string = "drake";
        var _title : string = "something something";
        var _transcript : string = "This is a short speech";

        Models.Users.findOne.mockReturnValueOnce(resolveWrap({id:2}));
        Models.Speeches.create.mockReturnValueOnce(resolveWrap("Correct return"));
        //TODO: Research a better way to do argument matching for return values
        Models.default.literal.mockImplementation(arg =>
            arg == "CURRENT_TIMESTAMP" ? "I can't believe its not undefined!" : undefined
        );

        var returnVal = await SQL.createSpeech(_username,_title,_transcript)
        expect(returnVal).toEqual("Correct return")
        expect(Models.Speeches.create).toBeCalledWith({
            user_id:2,
            title:_title,
            last_edited: "I can't believe its not undefined!",
            transcript:_transcript
        });
        expect(Models.Speeches.create).toBeCalledTimes(1)
        done()
    })

    test("getAllSpeechesForASpecificUser", async (done) => {
        var _username : string = "drake";
        var mock_speech_arrays = [
            {
                id:1
            },
            {
                id:2
            },
            {
                id:3
            },
        ];

        Models.Attempts.findAll.mockImplementation(arg =>{
            switch(arg.where.speech_id){
                case 1:
                    return resolveWrap("do re mi")
                case 2:
                    return resolveWrap("abc")
                case 3:
                    return resolveWrap("123")
                default:
                    fail()
            }
        });

        Models.Errors.findAll.mockImplementation(arg =>{
            switch(arg.where.speech_id){
                case 1:
                    return resolveWrap("22")
                case 2:
                    return resolveWrap("33")
                case 3:
                    return resolveWrap("44")
                default:
                    fail()
            }
        });

        Models.Speeches.findAll.mockReturnValueOnce(resolveWrap(mock_speech_arrays));
        Models.Users.findOne.mockReturnValueOnce(resolveWrap({id:2}));

        var returnVal = await SQL.getAllSpeechesForASpecificUser(_username)

        console.log(returnVal)
        done()
    })
});