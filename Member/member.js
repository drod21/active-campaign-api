const moment = require('moment')

const originalDateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'
const toDateFormat = 'MM-DD-YYYY'
// const formatDate = (date) => moment(new Date(date), originalDateFormat).format(toDateFormat)
const formatDate = (date) => new Date(date).toDateString()

class Member {
  constructor(data) {
    this.addressLine1 = data.addressLine1
    this.addressLine2 = data.addressLine2
    this.city = data.city
    this.convertedDate = data.convertedDate ? formatDate(data.convertedDate) : null
    this.dateOfBirth = formatDate(data.birthDate)
    this.email = data.email
    this.firstName = data.firstName
    this.gender = data.gender
    this.joinStatus = data.joinStatus
    this.lastName = data.lastName
    this.memberStatus = !this.isCanceling(data.memberStatus) ? 'Ok' : null
    this.membershipStatus = this.isCanceling(data.memberStatus) ? 'Ok' : null
    this.membershipType = data.membershipType
    this.memberSinceDate = data.memberSinceDate ? formatDate(data.memberSinceDate) : formatDate(data.createTimestamp)
    this.phone = data.primaryPhone
    this.postalCode = data.postalCode ? data.postalCode.split('-')[0] : null
    this.state = data.state
    this.totalCount = data.totalCheckInCount
    this.trialMember = data.joinStatus.toLowerCase() === 'prospect'
  }

  isCanceling(memberStatus) {
    return memberStatus.toLowerCase().contains('cancel')
  }

  toField() {
    return {
      Address1: this.addressLine1,
      Address2: this.addressLine2,
      City: this.city,
      'Converted Date': this.convertedDate,
      DOB: this.dateOfBirth,
      Gender: this.gender,
      JoinStatus: this.joinStatus,
      MemberStatus: this.memberStatus,
      MembershipStatus: this.membershipStatus,
      MembershipType: this.membershipType,
      MemberSinceDate: this.memberSinceDate,
      PostalCode: this.postalCode,
      State: this.state,
      TotalCount: this.totalCount,
      TrialMember: this.trialMember,
    }
  }
  toContact() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone
    }
  }
}

module.exports = { Member }
