const session = require('express-session');

const mongodbQuery = require('../api/mongodbQuery');
const taskersQuery = require('../api/taskersQuery');

const dbName = process.env.MONGODB_DB_NAME
const collectionName = process.env.MONGODB_COLLECTION

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const addTaskersCount = async () => {
  await mongodbQuery.login()
  const client = session.mongodb
  const list = await mongodbQuery.getDataWithPostCodeAndCategoryId()
  await asyncForEach(list, async (item) => {
    const count = await taskersQuery.getCount(item)
    const updateInDB = await client.db(dbName).collection(collectionName).updateOne(
      { URL: item.URL},
      {
        $set: { 'taskersCount': count },
        $currentDate: { lastModified: true }
      }
    )
    console.log(updateInDB);
  })
  mongodbQuery.logout()
  return
}

const updateCategoryId = async () => {
  await mongodbQuery.login()
  const client = session.mongodb
  const list = await mongodbQuery.getDataWithPostCode()
  await asyncForEach(list, async (item) => {
    let category = item.Breadcrumb3category ? item.Breadcrumb3category : (item.Breadcrumb2category ? item.Breadcrumb2category : item.Breadcrumb1category)
    let categoryId = await taskersQuery.getCategoryID(category)
    const action = await client.db(dbName).collection('xmlfeed').updateOne(
      { URL: item.URL},
      {
        $set: { 'taskerCategory': categoryId },
        $currentDate: { lastModified: true }
      }
    )
    console.log(action);
  })
  return
}

module.exports = {
  addTaskersCount,
  updateCategoryId
}
