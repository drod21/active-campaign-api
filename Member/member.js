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

  toJson() {
    return {
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      'Converted Date': this.convertedDate,
      'Date of Birth': this.dateOfBirth,
      email: this.email,
      firstName: this.firstName,
      gender: this.gender,
      'Join Status': this.joinStatus,
      lastName: this.lastName,
      'Membership Status': this.membershipStatus,
      'Member Since Date': this.memberSinceDate,
      phone: this.primaryPhone,
      'Postal Code': this.postalCode,
      state: this.state,
      'Total Count': this.totalCOunt
    }
  }
}

module.exports = { Member }