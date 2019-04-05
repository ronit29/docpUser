// set env vars
require('dotenv').config()

const path = require("path")
const fs = require("fs")
const DIST_PATH = path.join(__dirname, './dist')

try {
    let new_ejs_file = fs.readFileSync(DIST_PATH + '/index.new.ejs')
    try {
        let old_ejs_file = fs.readFileSync(DIST_PATH + '/index.ejs')
        if (old_ejs_file) {
            fs.unlinkSync(DIST_PATH + '/index.ejs')
        }
    } catch (e) {
        console.log(e)
    }
    if (new_ejs_file) {
        fs.renameSync(DIST_PATH + '/index.new.ejs', DIST_PATH + '/index.ejs')
    }
    console.log('BUILD PROCESS SUCCES')
} catch (e) {
    console.log('POST BUILD FAILED ' + e)
}