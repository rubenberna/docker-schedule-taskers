const axios = require('axios');

const baseURL = "https://api.taskbooker.be/graphql"
const api_key = process.env.TASKBOOKER_API_KEY

const getCount = async ({taskerCategory, CityPostalcode}) => {
  const q = `
    {
      listActiveUsers(filter:{categoryIds:["${taskerCategory}"], city: "${CityPostalcode}", roles:["tasker", "protasker"], radius: 5}) {
        total
        }
      }
  `
  try {
    const body = JSON.stringify({ query: q })
    const {data} = await axios.post(baseURL, body, {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": api_key,
        "referer": "https://api.taskbooker.be"
      },
    })
    return data.data.listActiveUsers.total
  } catch (e) {
    console.log(e);
  }
}

const getCategoryID = async categoryTitle => {
  const q = `
  {
    getCategory(title: "${categoryTitle}") {
      id
    }
  }
  `
  const body = JSON.stringify({ query: q })
  try {
    const {data} = await axios.post(baseURL, body, {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": api_key,
        "referer": "https://api.taskbooker.be"
      },
    })

    const id = data.data.getCategory ? data.data.getCategory.id : undefined
    return id
  } catch (e) {
    console.log(e);
    return
  }
}

module.exports = {
  getCount,
  getCategoryID
}
