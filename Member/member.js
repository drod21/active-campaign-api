class Member {
  constructor(data) {
    this.addressLine1 = data.addressLine1,
    this.addressLine2 = data.addressLine2,
    this.city = data.city,
    this.convertedDate = data.convertedDate,
    this.dateOfBirth = data.birthDate,
    this.email = data.email,
    this.firstName = data.firstName,
    this.gender = data.gender,
    this.joinStatus = data.joinStatus,
    this.lastName = data.lastName,
    this.membershipStatus = data.memberStatus,
    this.memberSinceDate = data.memberStatusDate,
    this.phone = data.primaryPhone,
    this.postalCode = data.postalCode,
    this.state = data.state,
    this.totalCount = data.totalCheckInCount
  }

  toField() {
    return {
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      convertedDate: this.convertedDate,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      joinStatus: this.joinStatus,
      membershipStatus: this.membershipStatus,
      memberSinceDate: this.memberSinceDate,
      postalCode: this.postalCode,
      state: this.state,
      totalCount: this.totalCount
    }
  }
  toContact() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.primaryPhone
    }
  }
}

module.exports = { Member }