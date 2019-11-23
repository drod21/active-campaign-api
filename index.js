const moment = require('moment')

const { getMembersCheckIns, getMembersCreated, getMembersModified } = require('./abc')
const { getPreviousDate, writeDate } = require('./util/date')
const { Member } = require('./Member/member')
// const { } = require('./active-campaign')

const updateMembers = (members) => members.map((member) => new Member(member.personal).toJson())
const onError = (error) => console.error('Error occurred::', error)
const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSSSSS'

async function main() {
  const prevDate = moment(getPreviousDate(), dateFormat).format(dateFormat)
  const currDate = moment(new Date()).format(dateFormat)
  
  const membersCreated = await getMembersCreated(currDate, prevDate).then(updateMembers).catch(onError)
  const membersModified = await getMembersModified(currDate, prevDate).then(updateMembers).catch(onError)
  const membersCheckins = await getMembersCheckIns(currDate, prevDate).then(updateMembers).catch(onError)

  // After everything is done, update the date
  writeDate(currDate)
}


main()

/* Data needed
  Membership Type
  Trial Member
*/