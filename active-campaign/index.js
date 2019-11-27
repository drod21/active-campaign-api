const axios = require('axios')
const qs = require('querystring')

const ACTIVE_CAMPAIGN_API_URL = 'https://abcfinancialtest2.api-us1.com/api/3'
const ACTIVE_CAMPAIGN_API_KEY = 'e9031858734d1e4434b8e5575c63c75e95fc7ef3d0fc5de9aa4880738d5d43949066877f'
const headers = { Api_token: ACTIVE_CAMPAIGN_API_KEY }

function getCurrentContacts() {
  return axios.get(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { headers }).then((res) => res.data)
}

async function getCurrentContactsByEmail(email) {
  return await axios.get(`${ACTIVE_CAMPAIGN_API_URL}/contacts?filters[email]=${email}`)
}

async function updateContacts(contacts) {
  const updateContactsCall = contacts.map((contact) => axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contact/sync`, {
    contact: contact.toJson(),
    field: contact.toField()
  }, { headers }))

  return await Promise.all(updateContactsCall)
}

async function createActiveCampaignUsers(contacts) {
  const createContactsCall = contacts.map((contact) => axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { contact: contact }, { headers }))

  return await Promise.all(createContactsCall).catch((err) => console.error(err))
}

module.exports = { createActiveCampaignUsers, getCurrentContacts, getCurrentContactsByEmail, updateContacts }
