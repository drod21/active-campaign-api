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


module.exports = { getPreviousDate, writeDate }