const moment = require('moment')

const { getMembersCheckIns, getMembersCreated, getMembersModified } = require('./abc')
const { getOriginalRunDate, getPreviousDate, writeDate } = require('./util/date')
const { Member } = require('./Member/member')
const { updateContacts } = require('./active-campaign')

const formatMembers = (members) => members.map((member) => new Member(member.personal))
const onError = (error) => console.error('Error occurred::', error)
const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'

async function main() {
  const originalRunDate = getOriginalRunDate()
  const prevDate = moment(getPreviousDate(), dateFormat).format(dateFormat)
  const updatedPrevDate = (!prevDate.includes('Invalid')) ? prevDate : ''
  const currDate = moment(new Date()).format(dateFormat)
  
  const membersCreated = await getMembersCreated(currDate, updatedPrevDate)
    .then(formatMembers)
    .then((members) => updateContacts(members))
    .then(() => writeDate(currDate))
    .catch(onError)
  const membersModified = await getMembersModified(currDate, originalRunDate).then(formatMembers).catch(onError)
  const membersCheckins = await getMembersCheckIns(currDate, originalRunDate).then(formatMembers).catch(onError)

  const members = [...membersCreated, ...membersModified, ...membersCheckins]
  await updateContacts(members).catch(onError)
}


main()