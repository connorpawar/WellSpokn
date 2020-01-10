const path = require('path')


jest.mock('../../database/models')

import SQL from '../../database/sql';
import * as Models from '../../database/models'

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
});