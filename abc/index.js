const axios = require('axios')

const CLUB_NUMBER = 1 // temp
const API_ENDPOINT = ''
const API_KEY = ''
const API_APP_ID = ''
const headers = {
  app_key: API_KEY,
  app_id: API_APP_ID
}

const getCreatedDateParams = (currDate, prevDate) => ({ createdTimestampRange: `${currDate},${prevDate}` })
const getModifiedDateParams = (currDate, prevDate) => ({ lastModifiedTimestampRange: `${currDate},${prevDate}` })
const getCheckInParams = (currDate, prevDate) => ({ lastCheckInTimestamp: `${currDate},${prevDate}` })

function getMembersCheckIns(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getCheckInParams(currDate, prevDate) })
}

function getMembersCreated(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getCreatedDateParams(currDate, prevDate) })
}

function getMembersModified(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getModifiedDateParams(currDate, prevDate) })
}

module.exports = { getMembersCheckIns, getMembersCreated, getMembersModified }