const moment = require('moment')

const { getMembersCheckIns, getMembersCreated, getMembersModified } = require('./abc')
const { getOriginalRunDate, getPreviousDate, writeDate } = require('./util/date')
const { Member } = require('./Member/member')
const { updateContacts } = require('./active-campaign')

const formatMembers = (members) => members.map(({ agreement, personal }) => new Member({
  ...personal,
  memberSinceDate: agreement.sinceDate,
  membershipType: agreement.membershipType
}))
const onError = (error) => console.error('Error occurred::', error)
const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'

async function main() {
  const originalRunDate = getOriginalRunDate()
  const prevDate = moment(getPreviousDate(), dateFormat).format(dateFormat)
  const updatedPrevDate = (!prevDate.includes('Invalid')) ? prevDate : ''
  const currDate = moment(new Date()).format(dateFormat)
  
  await getMembersCreated(currDate, updatedPrevDate)
    .then(formatMembers)
    .then((members) => updateContacts(members))
    .then(() => writeDate(currDate))
    .then(() => console.log('New member additions complete'))
    .catch(onError)
  await getMembersModified(currDate, originalRunDate)
    .then(formatMembers)
    .then((members) => updateContacts(members))
    .then(() => console.log('Updated members complete'))
    .catch(onError)
  await getMembersCheckIns(currDate, originalRunDate)
    .then(formatMembers)
    .then((members) => updateContacts(members))
    .then(() => console.log('Updated checkins complete'))
    .catch(onError)

  console.log('Run complete')
}


main()