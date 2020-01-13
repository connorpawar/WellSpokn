const path = require('path')


jest.mock('../../database/models')

import SQL from '../../database/sql';
import * as Models from '../../database/models'
import { response } from 'express';

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

        Models.Users.findOne.mockReturnValueOnce(
            new Promise((resolve,reject) => {
                resolve({id:2})
            }));
        Models.Speeches.create.mockReturnValueOnce(
            new Promise((resolve,reject) => {
                resolve("Correct return")
            }));
        //TODO: Research argument matching
        Models.default.literal.mockReturnValueOnce("I can't believe its not undefined!");

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
});