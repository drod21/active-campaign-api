const axios = require('axios')
const { getOriginalRunDate } = require('../util/date')

const CLUB_NUMBER = 6951
const API_ENDPOINT = 'https://api.abcfinancial.com/rest'
const API_KEY = '5305a1a07f233765bc88e660abc9cb43'
const API_APP_ID = '671036b1'
const headers = {
  app_key: API_KEY,
  app_id: API_APP_ID
}

const getCreatedDateParams = (currDate, prevDate, page) => ({ createdTimestampRange: shapeDates(currDate, prevDate), page })
const getModifiedDateParams = (currDate, prevDate) => ({ lastModifiedTimestampRange: shapeDates(currDate, prevDate), page })
const getCheckInParams = (currDate, prevDate) => ({ lastCheckInTimestamp: shapeDates(currDate, prevDate), page })
const shapeDates = (currDate, prevDate) => prevDate ? `${prevDate},${currDate}` : `${currDate}`

function shapeResponse(res) {
  if (res.status !== 200 || parseInt(res.data.status.count, 10) === 0) throw new Error('Error fetching members')

  return res.data.members
}

function handleError(error) {
  console.error('Error occurred::', error)
}

function callGetMembers(page) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: { page }})
}

async function getMembers(param) {
  let currPage = 1
  let memberCount = 0

  return await callGetMembers(currPage).then((res) => {
      if (res.status !== 200) throw new Error(`Issue getting members: ${res.data.status.message}`)
      memberCount = res.data.status.count

      return [...res.data.members]
    }).then(async (members) => {
      const updatedMembers = members.slice()

      if (updatedMembers.length < memberCount) {
        while (updatedMembers.length - 1 < memberCount) {
          ++currPage;

          await callGetMembers(currPage).then((res) => updatedMembers.push(...res.data.members))
        }
      }

      return updatedMembers.filter(({ memberId }, index) => updatedMembers.findIndex((x) => x.memberId === memberId) === index)
    })
}

function getMembersCheckIns(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getCheckInParams(currDate, prevDate, 1) })
    .then(shapeResponse)
    .catch(handleError)
}

function getMembersCreated(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getCreatedDateParams(currDate, prevDate, 1) })
    .then(shapeResponse)
    .catch(handleError)
}

function getMembersModified(currDate, prevDate) {
  return axios.get(`${API_ENDPOINT}/${CLUB_NUMBER}/members`, { headers, params: getModifiedDateParams(currDate, prevDate, 1) })
    .then(shapeResponse)
    .catch(handleError)
}

module.exports = { getMembers, getMembersCheckIns, getMembersCreated, getMembersModified }