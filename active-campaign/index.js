const axios = require('axios')

const ACTIVE_CAMPAIGN_API_URL = 'https://abcfinancialtest2.api-us1.com'
const ACTIVE_CAMPAIGN_API_KEY = 'e9031858734d1e4434b8e5575c63c75e95fc7ef3d0fc5de9aa4880738d5d43949066877f'

function getCurrentContacts() {
  return axios.get(`${ACTIVE_CAMPAIGN_API_URL}/api/3/contacts`, { headers: { Api_token: ACTIVE_CAMPAIGN_API_KEY }}).then((res) => res.data)
}

async function getCurrentContactsByEmail(email) {
  return await axios.get(`${ACTIVE_CAMPAIGN_API_URL}/3/contacts?filters[email]=${email}`)
}

/* Data needed
  First name
  Last name
  Email
  Gender
  Phone
  addressLine1
  addressLine2
  city
  state
  postalCode
  Membership Type
  Date of Birth
  Total Count (attendance)
  Trial Member
  Member Since Date
  Converted Date
  Membership Status
  Join Status
*/

function createActiveCampaignUser(listType, email, firstName, lastName) {
  const listId = {
    new: ACTIVE_CAMPAIGN_LIST_ID_ACCOUNT_CREATED,
    cancel: ACTIVE_CAMPAIGN_LIST_ID_CANCELLED
  }[listType]

  const request = {
    email: email,
    first_name: firstName,
    last_name: lastName
  }
  request['p[' + listId + ']'] = listId
  request['status[' + listId + ']'] = 1
  request['instantresponders[' + listId + ']'] = 1

  axios.post(ACTIVE_CAMPAIGN_API_URL + '/admin/api.php', qs.stringify(request), {
    params: {
      api_key: ACTIVE_CAMPAIGN_API_KEY,
      api_action: 'contact_add',
      api_output: 'json'
    }
  }).catch((err) => {
    console.log('createActiveCampaignUser error creating ' + email)
  })
}

function subscribeToOnboardingList(email, firstName, lastName, birthdate, gender, goal, goalLevel, expLevel, maintenanceCalories) {
  const request = {
    email: email,
    first_name: firstName,
    last_name: lastName,
    tags: goals[goal] + ', ' + goalLevels[goalLevel] + ', ' + expLevels[expLevel] + ', STATUS: New Sign Up',
    'field[%GENDER%, 0]': _.capitalize(gender),
    'field[%AGE%, 0]': Math.floor((new Date() - new Date(birthdate).getTime()) / 31536000000),
    'field[%DATE_OF_BIRTH%, 0]': birthdate
  }

  request['p[' + ONBOARDING_LIST_ID + ']'] = ONBOARDING_LIST_ID
  request['status[' + ONBOARDING_LIST_ID + ']'] = 1
  request['instantresponders[' + ONBOARDING_LIST_ID + ']'] = 1

  axios.post(ACTIVE_CAMPAIGN_API_URL + '/admin/api.php', qs.stringify(request), {
    params: {
      api_key: ACTIVE_CAMPAIGN_API_KEY,
      api_action: 'contact_add',
      api_output: 'json'
    }
  }).catch((err) => {
    console.log('subscribeToOnboardingList error creating ' + email, err)
  })
}

function updateActiveCampaignGoal(email, goal, goalLevel) {
  const goals = {
    'MUSCLE GAIN': 'GOAL: Muscle Gain',
    'FAT LOSS': 'GOAL: Fat Loss',
    'REVERSE DIETING': 'GOAL: Reverse Diet',
    'MAINTENANCE': 'GOAL: Maintenance',
  }

  const goalLevels = {
    'EASY': 'INTENSITY: Easy',
    'NORMAL': 'INTENSITY: Normal',
    'HARD': 'INTENSITY: Hard',
  }

  let tags = ''
  if(goal)
    tags = goals[goal]

  if(goalLevel && goal !== 'MAINTENANCE')
    tags += (tags) ? ', ' + goalLevels[goalLevel] : goalLevels[goalLevel]

  const request = qs.stringify({
    email: email,
    tags: tags
  })

  axios.post(ACTIVE_CAMPAIGN_API_URL + '/admin/api.php', request, {
    params: {
      api_key: ACTIVE_CAMPAIGN_API_KEY,
      api_action: 'contact_tag_add',
      api_output: 'json'
    }
  }).catch((err) => {
    console.log('updateActiveCampaignGoal error updating tag ' + email, err)
  })
}

module.exports = { createActiveCampaignUser, subscribeToOnboardingList, updateActiveCampaignGoal }
