const moment = require('moment')

const { getMembersCheckIns, getMembersCreated, getMembersModified } = require('./abc')
const { getPreviousDate, writeDate } = require('./util/date')
const { Member } = require('./Member/member')
const { updateContacts } = require('./active-campaign')

const formatMembers = (members) => members.map((member) => new Member(member.personal).toJson())
const onError = (error) => console.error('Error occurred::', error)
const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'

async function main() {
  const prevDate = moment(getPreviousDate(), dateFormat).format(dateFormat)
  const updatedPrevDate = (!prevDate.includes('Invalid')) ? prevDate : ''
  const currDate = moment(new Date()).format(dateFormat)
  
  const membersCreated = await getMembersCreated(currDate, updatedPrevDate).then(formatMembers).catch(onError)
  const membersModified = await getMembersModified(currDate, updatedPrevDate).then(formatMembers).catch(onError)
  const membersCheckins = await getMembersCheckIns(currDate, updatedPrevDate).then(formatMembers).catch(onError)

  const members = [...membersCreated, ...membersModified, ...membersCheckins]
  const success = await updateContacts(members).catch(onError)

  // After everything is done, update the date
  if (success && !success.error)
    writeDate(currDate)
}


main()