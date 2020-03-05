const mongodbQuery = require('./mongodbQuery');
const taskersQuery = require('./taskersQuery');

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const addTaskersCount = async () => {
  await mongodbQuery.login()
  const list = await mongodbQuery.getData()
  console.log(list);
  return
}

module.exports = {
  addTaskersCount
}
