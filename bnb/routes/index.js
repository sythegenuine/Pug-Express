const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const fs = require("fs");
const crypto = require("crypto");
const { X_OK } = require("constants");
const DBdirectory = "./routes/DB/";

/* GET home page. */
router.get('/test', (req,res) => {
  res.render('_header')
})

router.get("/", function (req, res, next) {

  console.log(req.cookies.sid)
  let isAuth = req.cookies.sid === undefined ? false : true;
  console.log(isAuth)
  res.render("index", { title: "Airbnb", isAuth });
});

router.get("/register", function (req, res, next) {
  res.render("signup", { title: "Signup" });
});

router.post("/register", (req, res) => {
  console.log(req)
  addUser(req.body.id, req.body.password, req.body.nickname);
  
  res.redirect("/");
});

const addUser = (id, password, nickname) => {
  let newUser = {
    id: id,
    password: password,
    nickname: nickname
  };

  const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync(DBdirectory + 'userinfo.json')
        const dataJson = dataBuffer.toString()
        const data = JSON.parse(dataJson)
        return data
    } catch(e) {
        return []
    }
}
  let message = "";

  fs.exists(DBdirectory + "userinfo.json", function (exists) {
    if (exists) {
        const data = loadUsers()
        console.log("데이터가 있니?", data, newUser)
        let counter = 0
        data.map((datum)=> {
          if(datum.id === newUser.id)
          counter +=1
            return console.log('User ID already exists!')
        })
        if (counter === 0)
        data.push(newUser)
        const chalJson = JSON.stringify(data)
        fs.writeFileSync(DBdirectory + "userinfo.json", chalJson)
          
    } else {
      console.log("userinfo.json does not exist");
      // const newArray = loadUsers()
      // console.log(dataBuffer)
      const userInfo = loadUsers()
      userInfo.push(newUser)
      dataJson = JSON.stringify(userInfo)
      
      fs.writeFileSync(DBdirectory + "userinfo.json", dataJson, (err) => {
        if(err) throw err;
        console.log('info 생성 후 user 추가!')
      })


      // fs.writeFile(DBdirectory + "userinfo.json", dataJson, function (err) {
      //   if (err) throw err;
      //   console.log("userinfo 만들고 user 추가 complete");
      // });
    }
  });
  return message;
};
router.get('/login', (req, res) => {
  res.render('login', {title:"Login", isAuth: false})
})

router.post('/login', (req, res) => {
  const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync(DBdirectory + 'userinfo.json')
        const dataJson = dataBuffer.toString()
        const data = JSON.parse(dataJson)
        return data
    } catch(e) {
        return []
    }
}
  const data = loadUsers()
  const getRandomSid = () => {
    const string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789";
    let result = Array(30).fill(0).map((v) => (v = string[Math.floor(Math.random() * 62)]));
    let a = result.join("");
    return a
  };
  console.log(req.body)

  data.map((datum) => {
    if(datum.id === req.body.id && datum.password === req.body.password) {
      res.cookie("sid", getRandomSid())
      console.log('COOKIE Generated!')

      let isAuth = (req.cookies.sid === "" ? false : true);
      console.log(isAuth)
      res.redirect('/')
    } else {
      console.log('Please check ur info!')
    }
  })
})

router.get('/logout', (req, res) => {
  // console.log("initial", res.req.headers.cookie)
  console.log(req.cookies.sid)
  let isAuth = (req.cookies.sid === "" ? false : true);
  console.log(isAuth)
  res.clearCookie("sid")
  console.log("dassdadsa",req.cookies.sid)

  console.log(isAuth)
  res.redirect('/')

})

router.get('/getposts', (req, res) => {
  const dataBuffer = fs.readFileSync(DBdirectory + 'posts.json')
  const dataJson = dataBuffer.toString()
  const data = JSON.parse(dataJson)
    res.render('__loadpost', {data: data})
})
    

module.exports = router;