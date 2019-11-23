const axios = require('axios')

const CLUB_NUMBER = 1 // temp
const API_ENDPOINT = 'https://api.abcfinancial.com/rest/2/'
const API_KEY = '5305a1a07f233765bc88e660abc9cb43'
const API_APP_ID = '671036b1'
const headers = {
  app_key: API_KEY,
  app_id: API_APP_ID
}

const getCreatedDateParams = (currDate, prevDate) => ({ createdTimestampRange: `${currDate},${prevDate}` })
const getModifiedDateParams = (currDate, prevDate) => ({ lastModifiedTimestampRange: `${currDate},${prevDate}` })
const getCheckInParams = (currDate, prevDate) => ({ lastCheckInTimestamp: `${currDate},${prevDate}` })

function response(res) {
  if (res.status.message !== 'success') throw new Error('Error fetching members')

  return res.members
}

function getMembersCheckIns(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getCheckInParams(currDate, prevDate) })
    .then(response)
}

function getMembersCreated(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getCreatedDateParams(currDate, prevDate) })
    .then(response)
}

function getMembersModified(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getModifiedDateParams(currDate, prevDate) })
    .then(response)
}

module.exports = { getMembersCheckIns, getMembersCreated, getMembersModified }