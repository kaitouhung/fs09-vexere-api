const _ = require("lodash");


const user_1 = {
    name: "Nguyen Van A",
    age: 30,
    education: {
        university: "DH Van Lang"
    },
    jobs: [{
        title: "teacher",
        type: "fulltime"
    },
    {
        title: "dev",
        type: "parttime"
    }


    ]
}

const user_2 = {
    name: "Tran Van B",
    age: 20,
    education: {
        university: "DH Van Lang"
    },
    jobs: []
}

const users = [user_1, user_2];

// users.forEach(user => {
//     user.job ? console.log(user.job.major) : console.log(null)
// })

// users.forEach(user => {
//     user.jobs && user.jobs.length > 0 ? console.log(user.jobs[0].title) : console.log(null)
// })

// _.get
// users.forEach(user => {
//     // user.jobs && user.jobs.length > 0 ? console.log(user.jobs[0].title) : console.log(null)
//     console.log(_.get(user, "jobs[0].title", "Thất nghiệp"));
// })

// _.set 

// _.chain

const url = "https://cybersoft.edu.vn/courses/1/chapters/2/videos/5";

// const parseUrl = url.split("/");
// const courseIndex = parseUrl.indexOf("courses")
// const courseIdIndex = courseIndex + 1;
// console.log("Course Id:", parseUrl[courseIdIndex]);

const getObjectId = (type) => {
    return _.chain(url)
        .split("/")
        .indexOf(type)
        .thru(value => value + 1)
        .thru(value => {
            return _.chain(url)
                .split("/")
                .get(value)
                .value()
        })
        .value()

}

console.log(getObjectId("courses"))






