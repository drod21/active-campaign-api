const moment = require('moment')

const dateFormat = 'DD-MM-YYYY'
const formatDate = (date) => moment(new Date(date)).format(dateFormat)

class Member {
  constructor(data) {
    this.addressLine1 = data.addressLine1,
    this.addressLine2 = data.addressLine2,
    this.city = data.city,
    this.convertedDate = data.convertedDate ? formatDate(data.convertedDate) : null,
    this.dateOfBirth = formatDate(data.birthDate),
    this.email = data.email,
    this.firstName = data.firstName,
    this.gender = data.gender,
    this.joinStatus = data.joinStatus,
    this.lastName = data.lastName,
    this.membershipStatus = data.memberStatus,
    this.memberSinceDate = formatDate(data.memberStatusDate) || formatDate(data.createTimestamp),
    this.phone = data.primaryPhone,
    this.postalCode = data.postalCode ? data.postalCode.split('-')[0] : null,
    this.state = data.state,
    this.totalCount = data.totalCheckInCount
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
      MembershipStatus: this.membershipStatus,
      MemberSinceDate: this.memberSinceDate,
      PostalCode: this.postalCode,
      State: this.state,
      TotalCount: this.totalCount
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
