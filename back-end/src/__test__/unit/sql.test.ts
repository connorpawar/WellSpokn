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

    //TODO: If this test is not good enough, fix it.
    test("getAllSpeechesForASpecificUser", async (done) => {
        const expectedReturnVal = {
            speeches: [
              {
                id: 1,
                name: 'Worry',
                transcript: 'I will need help with this later.',
                date_created: '12-12-19',
                date_last_modified: '10-12-20',
                error_count: 22
              },
              {
                id: 2,
                name: 'Anger',
                transcript: 'This test is how many lines!?',
                date_created: '12-12-19',
                date_last_modified: '11-12-20',
                error_count: 33
              },
              {
                id: 3,
                name: 'Distress',
                transcript: 'Javascript testing annoys me.',
                date_created: '12-12-19',
                date_last_modified: '12-12-20',
                error_count: 44
              }
            ]
          };
        var _username : string = "drake";
        var mock_speech_arrays = [
            {
                id:1,
                title:"Worry",
                last_edited:"10-12-20",
                createdAt:"12-12-19",
                transcript: "I will need help with this later.",
            },
            {
                id:2,
                title:"Anger",
                last_edited:"11-12-20",
                createdAt:"12-12-19",
                transcript: "This test is how many lines!?",
            },
            {
                id:3,
                title:"Distress",
                last_edited:"12-12-20",
                createdAt:"12-12-19",
                transcript: "Javascript testing annoys me.",
            },
        ];
        Models.Errors.findAll.mockImplementation(arg =>{
            switch(arg.where.speech_id){
                case 1:
                    return resolveWrap(22)
                case 2:
                    return resolveWrap(33)
                case 3:
                    return resolveWrap(44)
                default:
                    fail()
            }
        });

        Models.Speeches.findAll.mockReturnValueOnce(resolveWrap(mock_speech_arrays));
        Models.Users.findOne.mockReturnValueOnce(resolveWrap({id:2}));

        var returnVal = await SQL.getAllSpeechesForASpecificUser(_username)

        expect(returnVal).toEqual(expectedReturnVal)
        done()
    })
});