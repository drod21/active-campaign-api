const axios = require('axios')
const qs = require('querystring')

const ACTIVE_CAMPAIGN_API_URL = 'https://abcfinancialtest2.api-us1.com/api/3'
const ACTIVE_CAMPAIGN_API_KEY = 'e9031858734d1e4434b8e5575c63c75e95fc7ef3d0fc5de9aa4880738d5d43949066877f'
const headers = { Api_token: ACTIVE_CAMPAIGN_API_KEY }

const customFieldsMap = {
  addressLine1: 1,
  addressLine2: 2,
  city: 3,
  state: 4,
  postalCode: 5,
  convertedDate: 6,
  dateOfBirth: 7,
  gender: 8,
  joinStatus: 9,
  membershipStatus: 10,
  memberSinceDate: 11,
  totalCount: 12
}

function getCurrentContacts() {
  return axios.get(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { headers }).then((res) => res.data)
}

async function getCurrentContactsByEmail(email) {
  return await axios.get(`${ACTIVE_CAMPAIGN_API_URL}/contacts?filters[email]=${email}`)
}

async function updateContacts(contacts) {
  const fieldValues = []
  const updateContactsCall = contacts.map((contact) => axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contact/sync`, {
    contact: contact.toContact(),
  }, { headers }))
  // .then((res) => {
  //   const id = res.contact.id
  //   const contact = contacts.find((contact) => contact.toContact().email.toLowerCase() === res.contact.email.toLowerCase())
  //   fieldValues.push(...postFieldValues(id, contact))
  // }))

  await Promise.all(updateContactsCall).then(contacts => console.log(contacts))
  await Promise.all(fieldValues)
}

function postFieldValues(id, contact) {
  const postArray = Object.entries(contact.toField()).map((key, value) => ({
    contact: id,
    field: customFieldsMap[key],
    value
  }))
  
  return postArray.map((body) => axios.post(`${ACTIVE_CAMPAIGN_API_URL}/fieldValues`, { fieldValue: body }, { headers }))
}

function createActiveCampaignUsers(contacts) {
  return axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { contacts }, { headers })
}

module.exports = { createActiveCampaignUsers, getCurrentContacts, getCurrentContactsByEmail, updateContacts }
