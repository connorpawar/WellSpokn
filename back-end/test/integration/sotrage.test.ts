const assert = require('assert')
const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')


import { Storage } from '../../src/storage';

describe('storage module', () => {
 
    before('cleanUp', () => {
        rimraf(Storage.uploadDir, () => {});
    });

    beforeEach('initialize', () => {
        Storage.initializeFolder();
    });

    afterEach('cleanUp', () => {
        rimraf(Storage.uploadDir, () => {});
    });
    
    it('should have a folder after initialization', (done) => {
        assert.strictEqual(
            fs.lstatSync(Storage.uploadDir).isDirectory(),
            true
        );
        done();
    });

    it('should empty folders after emptyFolder()', (done) => {
        const data = ['abba','tiger','penguin']
        data.forEach(item =>{
            const itemPath = path.join(Storage.uploadDir,item);
            fs.writeFileSync(itemPath,item)
            assert.strictEqual(fs.existsSync(itemPath),true)
        });
        Storage.emptyFolder();
        data.forEach(item =>{
            const itemPath = path.join(Storage.uploadDir,item);
            assert.strictEqual(fs.existsSync(itemPath),false)
        });
        done();
    });
});