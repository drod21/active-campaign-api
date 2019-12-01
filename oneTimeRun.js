const moment = require('moment')
const { createActiveCampaignUsers, updateContacts } = require('./active-campaign')
const { getMembers } = require('./abc')
const { writeDate } = require('./util/date')
const { Member } = require('./Member/member')

async function main() {
  // const formatMembers = (members) => members.map((member) => new Member(member.personal))
  // const onError = (error) => {
  //   console.error('Error occurred::', error)
  //   return { error: true }
  // }
  const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'
  // const currDate = moment(new Date()).format(dateFormat)
  // const success = await getMembers().then(formatMembers).then(updateContacts).catch(onError)

  // if(success && !success.error)
  //   writeDate(currDate)
  console.log(moment(new Date()).format(dateFormat))
}

main()