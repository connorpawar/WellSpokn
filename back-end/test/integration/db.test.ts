import SQL from '../../src/models/db';

describe('Database tests using SQLite in memory database', () => {   
    beforeEach(() =>{
        SQL.hardInitialize()
    })
    it('should create users', (done) => {

    })
});