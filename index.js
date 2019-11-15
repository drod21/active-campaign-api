const moment = require('moment')

const { getMembersCheckIns, getMembersCreated, getMembersModified } = require('./abc')
const { getPreviousDate, writeDate } = require('./util/date')
// const { } = require('./active-campaign')

const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSSSSS'

async function main() {
  const prevDate = moment(getPreviousDate(), dateFormat).format(dateFormat)
  const currDate = moment(new Date()).format(dateFormat)
  
  // const membersCreated = await getMembersCreated(currDate, prevDate)
  // const membersModified = await getMembersModified(currDate, prevDate)
  // const membersCheckins = await getMembersCheckIns(currDate, prevDate)

  // After everything is done, update the date
  writeDate(currDate)
}

main()