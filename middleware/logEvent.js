const {format} = require('date-fns')
const {v4: uuid} = require('uuid')


const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')

const logEvents = async(message, logFileName) => {
    
    const dateTime = format(new Date(), `yyyy-mm-dd\t\tHH:mm:ss`) 
    const logItem = `${dateTime}\t ${uuid()}\t ${message} \n`
    // console.log(logItem)
    // console.log(dateTime)
   

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName ), logItem)
    }catch (err) {
        console.log(err)
    }
   
}

const  logger =((req, res, next) => {
    console.log(`${req.method}\n${req.path}`);
    logEvents(`${req.method}\t${req.path}\t${req.headers.origin}`, 'reqlog.txt');
    next()
})


module.exports = {logEvents, logger}