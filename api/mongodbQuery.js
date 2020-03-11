const mongodb = require('mongodb');
const session = require('express-session');

const url = process.env.MONGODB_URL
const dbName = process.env.MONGODB_DB_NAME
const collectionName = process.env.MONGODB_COLLECTION

const login = async () => {
  const client = await mongodb.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  session.mongodb = client
}

const logout = () => {
  const client = session.mongodb
  client.close()
}

const getDataWithPostCode = async () => {
  try {
    const client = session.mongodb
    const collection = client.db(dbName).collection(collectionName)
    const data = await collection.find({CityPostalcode : { $ne: '' }}).project({URL: 1, Breadcrumb1category: 1, Breadcrumb2category: 1, Breadcrumb3category: 1, Province: 1, CityPostalcode: 1}).toArray()
    return data
  } catch (e) {
    console.log('error: ', e);
  }
}

const getDataWithPostCodeAndCategoryId = async () => {
  try {
    const client = session.mongodb
    const collection = client.db(dbName).collection(collectionName)
    const data = await collection.find({CityPostalcode : { $ne: '' }, taskerCategory: {$ne: '' }}).toArray()
    return data
  } catch (e) {
    console.log('error: ', e);
  }
}

module.exports = {
  getDataWithPostCode,
  login,
  logout,
  getDataWithPostCodeAndCategoryId
}
