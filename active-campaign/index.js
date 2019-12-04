const axios = require('axios')
const qs = require('querystring')

const ACTIVE_CAMPAIGN_API_URL = 'https://westseattlehc1905.api-us1.com/api/3'
const ACTIVE_CAMPAIGN_API_KEY = '1627e4be72b45515459d19c498580da3e753bd5b1d5690ae23f747da6c7450947fb4565d'
const headers = { Api_token: ACTIVE_CAMPAIGN_API_KEY }

const customFieldsMap = {
  Address1: 8,
  Address2: 9,
  City: 10,
  State: 11,
  PostalCode: 12,
  'Converted Date': 20,
  DOB: 7,
  Gender: 5,
  JoinStatus: 18,
  MembershipStatus: 21,
  // MemberSinceDate: 11,
  TotalCount: 22
}
// createCustomField().then(() => getCustomFields())
function getCustomFields() {
  return axios.get(`${ACTIVE_CAMPAIGN_API_URL}/fields`, { headers }).then((res) => res.data.fields.map(x => ({ title: x.title, id: x.id }))).then((res) => console.log(res))
}

function createCustomField() {
  return axios.post(`${ACTIVE_CAMPAIGN_API_URL}/fields`, { field: { type: 'textarea', title: 'MemberSinceDate', isRequired: 0 }}, { headers })
}

function getCurrentContacts(offset = 0) {
  return axios.get(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { headers, params: { limit: 100, offset } }).then((res) => res.data)
}
function deleteContact(contactId) {
  return axios.delete(`${ACTIVE_CAMPAIGN_API_URL}/contacts/${contactId}`, { headers })
}
async function deleteContacts() {
  const contactIds = []
  let contactsLength = 0

  await getCurrentContacts().then((res) => {
    contactsLength = res.meta.total
    res.contacts.map((contact) => contactIds.push(contact.id))
  })

  console.log('Fetching the rest of contacts... current length:', contactsLength, contactIds.length)
  while(contactIds.length - 1 < contactsLength) {
    await getCurrentContacts(contactIds.length - 1).then((res) => res.contacts.map((contact) => contactIds.push(contact.id)))
  }

  const removedDuplicateIds = [...new Set(contactIds)]
  console.log('Deleting... total length of contacts, contact ids::', contactsLength, removedDuplicateIds.length)
  const deletePromises = removedDuplicateIds.map((id) => deleteContact(id))
  return await Promise.all(deletePromises)
}

async function getCurrentContactsByEmail(email) {
  return await axios.get(`${ACTIVE_CAMPAIGN_API_URL}/contacts?filters[email]=${email}`)
}

async function updateContacts(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i]
    if (!contact.email)
      continue;

    const cont = await axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contact/sync`, { contact: contact.toContact() }, { headers }).then((res) => res.data.contact)
    const { id } = cont
    await postFieldValues(id, contact)
  }
}

async function postFieldValues(id, contact) {
  const postArray = Object.entries(contact.toField()).map(([key, value]) => ({
    contact: parseInt(id, 10),
    field: customFieldsMap[key],
    value
  }))

  for (let body of postArray) {
    await axios.post(`${ACTIVE_CAMPAIGN_API_URL}/fieldValues`, { fieldValue: body }, { headers })
  }
}

async function createActiveCampaignUsers(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i]
    if (!contact.email)
      continue;

    const cont = await axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { contact: contact.toContact() }, { headers }).then((res) => res.data.contact)
    const { id } = cont
    await postFieldValues(id, contact)
  }
}

module.exports = {
  createActiveCampaignUsers,
  deleteContact,
  deleteContacts,
  getCurrentContacts,
  getCurrentContactsByEmail,
  updateContacts
}
