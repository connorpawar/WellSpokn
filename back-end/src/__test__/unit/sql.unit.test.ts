jest.mock('../../database/models')

import SQL from '../../database/sql';
import * as Models from '../../database/models'


const expectedErrorArrayVal = [
    {
        type : "javascript",
        start : 1,
        end : 23,
        description : "Testing is annoying"
    },
    {
        type : "csharp",
        start : 51,
        end : 5523,
        description : "This isn't csharp"
    },
    {
        type : "python",
        start : 1,
        end : 465,
        description : "huh?"
    }
];

function resolveWrap(arg){
    return new Promise((resolve,reject) =>{
        resolve(arg)
    })
}

describe('sql module', () => {
    test("softInitialize", () => {
        Models.default.sync = jest.fn(a => resolveWrap(undefined))
        SQL.softInitialize().then(() =>{});
        expect(Models.default.sync).toBeCalledWith({force:false})
        expect(Models.default.sync).toBeCalledTimes(1)
    })

    test("hardInitialize", () => {
        Models.default.sync = jest.fn(a => resolveWrap(undefined))
        SQL.hardInitialize().then(() =>{});
        expect(Models.default.sync).toBeCalledWith({force:true})
        expect(Models.default.sync).toBeCalledTimes(1)
    })

    test("registerUser", () => {
        var _password : string = "p@ssW0rd";
        var _firstname : string = "dan";
        var _lastname : string = "sam";
        var _email : string = "something@somewhere.com";

        SQL.registerUser(_email,_firstname,_lastname,_password);

        expect(Models.Users.create).toBeCalledWith({
            email:_email,
            firstname:_firstname,
            lastname:_lastname,
            password:_password
        });
        expect(Models.Users.create).toBeCalledTimes(1)
    })

    test("getUser", async (done) => {
        var _email : string = "something@somewhere.com";

        await SQL.getUser(_email);

        expect(Models.Users.findOne).toBeCalledWith({
            where:{
                email:_email
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

        var returnVal = await SQL.upsertSpeech(_username,_title,_transcript)
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
        const longTranscript = 'Javascript testing annoys me. Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line. Javascript testing annoys me. Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.  Long line.';
        const expectedReturnVal = {
            speeches: [
              {
                id: 1,
                name: 'Worry',
                transcript_preview: 'I will need help with this later.',
                date_created: '2019-12-12',
                date_last_modified: '2020-10-12',
                error_count: 22
              },
              {
                id: 2,
                name: 'Anger',
                transcript_preview: 'This test is how many lines!?',
                date_created: '2019-12-12',
                date_last_modified: '2020-11-12',
                error_count: 33
              },
              {
                id: 3,
                name: 'Distress',
                transcript_preview: longTranscript.substr(0,126)+"...",
                date_created: '2019-12-12',
                date_last_modified: '2020-12-12',
                error_count: 44
              }
            ]
          };
        var _username : string = "drake";
        var mock_speech_arrays = [
            {
                id:1,
                title:"Worry",
                last_edited:new Date("10-12-20"),
                createdAt:new Date("12-12-19"),
                transcript: "I will need help with this later.",
            },
            {
                id:2,
                title:"Anger",
                last_edited:new Date("11-12-20"),
                createdAt:new Date("12-12-19"),
                transcript: "This test is how many lines!?",
            },
            {
                id:3,
                title:"Distress",
                last_edited: new Date("12-12-20"),
                createdAt: new Date("12-12-19"),
                transcript: longTranscript,
            },
        ];
        Models.Errors.findAll.mockImplementation(arg =>{
            switch(arg.where.speech_id){
                case 1:
                    return resolveWrap({length:22})
                case 2:
                    return resolveWrap({length:33})
                case 3:
                    return resolveWrap({length:44})
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

    //TODO: Unskip later.
    test.skip("getSpecificSpeech", async (done) => {
        const expectedUserId = 145;
        const expectedId = 1;
        const expectedReturnSpeechVal = {
            id: 1,
            name: 'Worry',
            transcript: 'I will need help with this later.',
            createdAt : new Date("2019-12-12"),
            last_edited: new Date("2020-10-12"),
            error_count: 22
        };
        const map1 = {
            javascript : 3,
            csharp : 9999,
            python : 2,
        }
        const map2 = {
            javascript : 293,
            csharp : 3,
            python : 345,
        }
        const map3 = {
            javascript : 1,
            csharp : 1,
            python : 1,
        }
        const findAllAttemptReturnVal = [
            {
                id: 1,
                mapping: JSON.stringify(map1),
            },
            {
                id: 2,
                mapping: JSON.stringify(map2),
            },
            {
                id: 3,
                mapping: JSON.stringify(map3),
            }
        ];

        Models.Speeches.findOne.mockImplementation((arg) =>{
            if(arg.where.id === expectedId && arg.where.user_id == expectedUserId){
                return resolveWrap(expectedReturnSpeechVal);
            }else{
                fail();
            }
        });
        //TODO: OKay, why does this work but using mock implementation override each other!?
        Models.Attempts.findAll = arg => {
            if(arg.where.speech_id === expectedId){
                return resolveWrap(findAllAttemptReturnVal);
            }else{
                fail();
            }
        }
        Models.Errors.findAll = arg => {
            if(arg.where.speech_id === expectedId){
                return resolveWrap(expectedErrorArrayVal);
            }else{
                fail("Error.findAll failed");
            }
        };

        var actualDataReturn = await SQL.getSpecificSpeech(expectedUserId,expectedId);
        var expectedDataReturn = {
            "date_created": "2019-12-12",
            "date_last_modified": "2020-10-12",
            "error_count": 22,
            "errors": [
              {
                "description": "Testing is annoying",
                "end": 23,
                "start": 1,
                "type": "javascript",
              },
              {
                "description": "This isn't csharp",
                "end": 5523,
                "start": 51,
                "type": "csharp",
              },
              {
                "description": "huh?",
                "end": 465,
                "start": 1,
                "type": "python",
              },
            ],
            "errors_by_attempt": [
              {
                "csharp": 9999,
                "javascript": 3,
                "python": 2,
              },
              {
                "csharp": 3,
                "javascript": 293,
                "python": 345,
              },
              {
                "csharp": 1,
                "javascript": 1,
                "python": 1,
              },
            ],
            "id": 1,
            "latest_error_count": 3,
            "name": "Worry",
            "previous_attempts": 2,
            "transcript": "I will need help with this later.",
          };
        expect(actualDataReturn).toEqual(expectedDataReturn)
        done();
    })



    test("addError", async (done) => {
        var ActualType = "Opinion"
        var ActualStart = 13
        var ActualEnd = 44
        var ActualDescription = "I don't like this part."
        var ActualSpeechId = 9999;
        
        Models.Errors.create = jest.fn();
        var errorInput = SQL.addError(ActualSpeechId,ActualType, ActualStart, ActualEnd, ActualDescription);

        var Result = await errorInput;

        expect(Models.Errors.create).toBeCalledWith({
            speech_id:ActualSpeechId,
            type:ActualType,
            start:ActualStart,
            end:ActualEnd,
            description:ActualDescription
        })
        done();
    })

    test("finalizeAttempt", async (done) =>{
        var actualSpeechId = 2
        var DataMock : Array<any> = []
        DataMock.push({type:"Descript"})
        DataMock.push({type:"Abba"})
        DataMock.push({type:"Repeated"})
        DataMock.push({type:"Repeated"})
        Models.Attempts.create = (obj) =>{
            return resolveWrap({mapping: JSON.parse(obj.mapping)})
        };
        Models.Errors.findAll = (whereObj) =>{
            if(whereObj.where.speech_id == actualSpeechId){
                return resolveWrap(DataMock)
            }else{
                fail("Find all called with wrong arguement")
            }
        }
        var funcReturn = await SQL.finalizeAttempt(actualSpeechId)
        var expectedDatabaseInput = {"Descript":1,"Abba":1,"Repeated":2};
        expect(funcReturn).toEqual(expectedDatabaseInput);
        done();
    })
});