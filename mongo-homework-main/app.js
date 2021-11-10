'use strict'
const {mapUser, getRandomFirstName,mapArticle} = require('./util')
// db connection and settings
const connection = require('./config/connection')

const students = require('./students.json');
let studentCollection;
async function run() {
  await connection.connect()
  await connection.get().dropCollection('students')
  await connection.get().createCollection('students')
  studentCollection = connection.get().collection("students")

  await example1()
  await example2()
  await example3()
  await example4()
  await example5()
  await example6()
  await example7()
  await example8()
  await example9()
  console.log('111');
  await connection.close()
}
run()

// #### Users

// - Create 2 users per department (a, b, c)
async function example1() {

  try {
    const deps = ["a", "a", "b", "b", "c", "c"];
  const users = deps.map(dep=>({department:dep})).map(mapUser)
const res = await studentCollection.insertMany(users);

  }catch(err){
    console.log(err)
  }
}

// - Delete 1 user from department (a)

async function example2() {
  try {
const result = await studentCollection.deleteOne({department:"a"}) 
  } catch (err) {
    console.error(err)
  }
}

// - Update firstName for users from department (b)

async function example3() {
  try {
const StudentB = await studentCollection.find({department:"b"}).toArray()
const bulkWrite  = StudentB.map((student)=>({
  updateOne:{
    filter:{_id:student._id},
    update:{$set:{firstName :getRandomFirstName()}}

  }
}))  
const {result} = await studentCollection.bulkWrite(bulkWrite) 
} catch (err) {
    console.error(err)
  }
}

// - Find all users from department (c)
async function example4() {
  try {
const result = await studentCollection.find({department:'c'});
  } catch (err) {
    console.error(err)
  }
}

async function example5() {
  let type = ["a","b","c"];
  let count = 0;
  let arrType = [];
  for(let a = 0;a<3;a++){
    for(let i = 0; i<=4;i++){
     arrType.push(type[count])
      }
        ++count;
      }
  try {
  const articles = arrType.map(article=>({type:article})).map(mapArticle)
  console.log("articles",articles)
  const res = await studentCollection.insertMany(articles);
  }catch(err){
    console.log(err)
  }
} 
async function example6() {
  try {
    const articles = await studentCollection.find({type:"a"}).toArray()
    console.log("articles", articles)
    const bulkWrite  = articles.map((student)=>({
      updateOne:{
        filter:{_id:student._id},
        update:{$set:{ tags :['tag1-a', 'tag2-a', 'tag3']}}
    
      }
    })) 
    console.log("here--------",bulkWrite) 
    const result = await studentCollection.bulkWrite(bulkWrite) 
    console.log("result",result);


console.log(result)
  } catch (err) {
    console.error(err)
  }
}

async function example7() {
  try {
    const articles = await studentCollection.find({$or:[{"type": {$eq:"b"}},{"type":{$eq:"c"}}]} ).toArray()
    console.log("------------------------",articles)
    const bulkWrite  = articles.map((student)=>({
      updateOne:{
        filter:{_id:student._id},
        update:{$set:{ tags :['tag2', 'tag3', 'super']}}
    
      }
    }))  
    const result = await studentCollection.bulkWrite(bulkWrite) 
    console.log("result",result);


console.log(result)
  } catch (err) {
    console.error(err)
  }
}
//   Find all articles that contains tags [tag2, tag1-a]
async function example8() {
  try {
const result = await studentCollection.find({tags:["tag2", "tag1-a"]});
console.log("example8",result)
  } catch (err) {
    console.error(err)
  }
}

// Pull [tag2, tag1-a] from all articles

async function example9() {
  try {
const result = await studentCollection.update({$or:[{"tags": {$exists:"tag2"}},{"tags":{$exists:"tag1-a"}}]},{
    $pull:{ tags:''}
});
  } catch (err) {
    console.error(err)
  }
}
