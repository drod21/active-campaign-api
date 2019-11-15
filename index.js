const moment = require('moment')

const { getMembersCheckIns, getMembersCreated, getMembersModified } = require('./abc')
const { getPreviousDate, writeDate } = require('./util/date')
// const { } = require('./active-campaign')

const updateMembers = (members) => members.map((member) => shapeMember(member))
const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSSSSS'

async function main() {
  const prevDate = moment(getPreviousDate(), dateFormat).format(dateFormat)
  const currDate = moment(new Date()).format(dateFormat)
  
  const membersCreated = await getMembersCreated(currDate, prevDate).then(updateMembers)
  const membersModified = await getMembersModified(currDate, prevDate).then(updateMembers)
  const membersCheckins = await getMembersCheckIns(currDate, prevDate).then(updateMembers)

  // After everything is done, update the date
  writeDate(currDate)
}


main()

/* Data needed
  Membership Type
  Trial Member
*/
function shapeMember(member) {
  return {
    addressLine1: member.personal.addressLine1,
    addressLine2: member.personal.addressLine2,
    city: member.personal.city,
    'Converted Date': member.personal.convertedDate,
    'Date of Birth': member.personal.birthDate,
    email: member.personal.email,
    firstName: member.personal.firstName,
    gender: member.personal.gender,
    'Join Status': member.personal.joinStatus,
    lastName: member.personal.lastName,
    'Membership Status': member.personal.memberStatus,
    'Member Since Date': member.personal.memberStatusDate,
    phone: member.personal.primaryPhone,
    'Postal Code': member.personal.postalCode,
    state: member.personal.state,
    'Total Count': member.personal.totalCheckInCount,
  }
}