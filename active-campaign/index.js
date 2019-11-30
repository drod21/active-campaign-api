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

const getContacts = (contacts) => contacts.map((contact) => contact.toContact())
const getContactFields = (contacts) => contacts.map((contact) => contact.toField())

async function updateContacts(contacts) {
  const fieldValues = []
  const updatedContacts = getContacts(contacts)
  const contactFields = getContactFields(contacts)
  
  const updateContactsCall = updatedContacts.map((contact) => axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contact/sync`, { contact }, { headers }))
    .then((res) => {
      const id = res.contact.id
      const contact = contacts.find((contact) => contact.toContact().email.toLowerCase() === res.contact.email.toLowerCase())
      fieldValues.push(...postFieldValues(id, contact))
    })

  await Promise.all(updateContactsCall).then(contacts => console.log(contacts)).catch((error) => console.error(error))
  if (fieldValues.length)
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

async function createActiveCampaignUsers(contacts) {
  const fieldValues = []
  // const createContactPromises = updatedContacts.map((contact) => axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { contact }, { headers }))
  for (let contact of contacts) {
    await axios.post(`${ACTIVE_CAMPAIGN_API_URL}/contacts`, { contact: contact.toContact() }, { headers }).then((res) => {
      const { id } = res.data.contact
      fieldValues.push(...postFieldValues(id, contact))
    })
  }
  return await Promise.all(fieldValues)
  // await deleteContacts()
}

module.exports = {
  createActiveCampaignUsers,
  deleteContact,
  deleteContacts,
  getCurrentContacts,
  getCurrentContactsByEmail,
  updateContacts
}
