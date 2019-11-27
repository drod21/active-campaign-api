const moment = require('moment')
const { createActiveCampaignUsers, updateContacts } = require('./active-campaign')
const { getMembers } = require('./abc')
const { writeDate } = require('./util/date')
const { Member } = require('./Member/member')

// TODO: have to look at field and fieldValue
async function main() {
  const updateMembers = (members) => members.map((member) => new Member(member.personal))
  const onError = (error) => {
    console.error('Error occurred::', error)
    return { error: true }
  }
  const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'
  const currDate = moment(new Date()).format(dateFormat)
  const success = await getMembers().then(updateMembers).then(updateContacts).catch(onError)

  if(!success.error)
    writeDate(currDate)
}

main()