const form = document.querySelector('form')
const signupId = document.querySelector('#signupId')
const signupPw = document.querySelector('#signupPw')
const signupPwConfirm = document.querySelector('#signupPwConfirm')
const signupNickname = document.querySelector('#signupNickname')
const notice = document.querySelector('#notice')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = {}
    if(signupPw.value !== signupPwConfirm.value){
        return notice.innerText = 'Please check ur info'
    }
    data["id"] = signupId.value
    data["password"] = signupPw.value
    data["nickname"] = signupNickname.value
    const regiInfo = data
    console.log(regiInfo)
})