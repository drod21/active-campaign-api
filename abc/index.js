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
    .then((res) => {
      if(res.status.message !== 'success') throw new Error('Error getting members')
      
      return res.members
    })
}

function getMembersCreated(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getCreatedDateParams(currDate, prevDate) })
    .then((res) => {
      if(res.status.message !== 'success') throw new Error('Error getting members')
      
      return res.members
    })
}

function getMembersModified(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getModifiedDateParams(currDate, prevDate) })
    .then((res) => {
      if(res.status.message !== 'success') throw new Error('Error getting members')
      
      return res.members
    })
}

module.exports = { getMembersCheckIns, getMembersCreated, getMembersModified }