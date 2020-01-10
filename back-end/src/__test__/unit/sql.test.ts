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
});