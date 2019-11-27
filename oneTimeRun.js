const moment = require('moment')
const { createActiveCampaignUsers, updateContacts } = require('./active-campaign')
const { getMembers } = require('./abc')
const { writeDate } = require('./util/date')
const { Member } = require('./Member/member')

async function main() {
  const updateMembers = (members) => members.map((member) => new Member(member.personal))
  const onError = (error) => console.error('Error occurred::', error)
  const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'
  const currDate = moment(new Date()).format(dateFormat)
  await getMembers().then(updateMembers).then(updateContacts).catch(onError)
  // await updateContacts(members)

  writeDate(currDate)
}

main()