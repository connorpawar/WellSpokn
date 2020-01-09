const path = require('path')


jest.mock('fs')

import { Storage } from '../../storage';

describe('storage module', () => {
    var fs : any = require('fs')
    var expectedPath : string = "";

    beforeEach(() => {
        fs = require('fs')
        expectedPath = "";
    })

    test('should have a folder after initialization if it does not already exist', () => {
        fs.existsSync = (path) => {
            expectedPath = path;
            return false;
        }
        Storage.initializeFolder();
        expect(fs.mkdirSync).toBeCalledWith(expectedPath);
    });
    test('if the folder already exists at initialization, empty it', () => {
        var dummyFilenames = ["tiger","bear","cat"]
        fs.existsSync = (path) => {
            expectedPath = path;
            return true;
        }
        fs.readdirSync = (dir) => {
            if(dir === expectedPath){
                return dummyFilenames
            }else{
                fail()
            }
        }
        Storage.initializeFolder();
        dummyFilenames.forEach((filename) =>{
            expect(fs.unlink).toBeCalledWith(path.join(expectedPath,filename),expect.anything());
        })
    });
});