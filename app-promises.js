const users = [{
  name: 'mohit',
  id: 1,
  schoolId: 100
},
{
  name: 'shikha',
  id: 2,
  schoolId: 200
}];

const grades = [{
  id: 1,
  schoolId: 100,
  marks: 80
},
{
  id: 2,
  schoolId: 200,
  marks: 90
},
{
  id: 1,
  schoolId: 100,
  marks: 70
}];

const getUser = id => new Promise((resolve, reject) => {
  const user = users.find(user => user.id === id);
  if (user) {
    resolve(user);
  } else {
    reject(`No user found for id ${id}`);
  }
});

// getUser(3).then(user => console.log(user)).catch((e) => {
//   console.log(e);
// });

const getGrades = schoolId => new Promise((resolve, reject) => {
  const grade = grades.filter(grade => grade.schoolId === schoolId);
  resolve(grade);
});

// getGrades(200).then(user => console.log(user)).catch((e) => {
//   console.log(e);
// });

const getStatus = (id) => {
  var user;
  return getUser(id).then((someUser) => {
    user = someUser;
    return getGrades(user.schoolId);
  }).then((grade) => {
    var avg = 0;
    if (grade.length > 0) {
      avg = grade.map(user => user.marks).reduce((a, b) => a + b);
    }
    return `${user.name} has got ${avg/grade.length}%.`
  }).catch((e) => {
    console.log(e);
  });
};

// getStatus(3).then((status) => {
//   if (status) {
//     console.log(status);
//   }
// }).catch((e) => {
//   console.log(e);
// });


/**** async - await ******/

// const getStatusAlt = async (id) => {
// //return 'mohit'
// throw new Error('not mohit');
// };

//Equivalent of above:

// getStatusAlt((id) => {
//   return new Promise((resolve, reject) => {
//     resolve('Mike');
      // reject('not mohit');
//   }
// })



//console.log(getStatusAlt());

//await is used before a promise
const getStatusAlt = async (id) => {
  const user = await getUser(id);
  const grade = await getGrades(user.schoolId);
  var avg = 0;
  if (grade.length > 0) {
    avg = grade.map(user => user.marks).reduce((a, b) => a + b);
  }
  return `${user.name} has got ${avg/grade.length}%.`
}

getStatusAlt(3).then(status => console.log(status)).catch(e => console.log(e));
