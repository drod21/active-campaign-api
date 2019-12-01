const fs = require('fs')

function writeDate(date) {
  fs.writeFile('date.txt', date, (err) => {
    if(err) throw err

    console.log('Date saved!')
  })
}

function getPreviousDate() {
  return fs.readFileSync('date.txt')
}

function getOriginalRunDate() {
  return fs.readFileSync('original-date.txt')
}

module.exports = { getOriginalRunDate, getPreviousDate, writeDate }