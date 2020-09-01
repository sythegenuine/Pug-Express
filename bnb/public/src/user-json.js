const signupBtn = document.querySelector('.signupBtn')
const signupId = document.querySelector('#signupId')
const signupPw = document.querySelector('#signupPw')
const signupNickname = document.querySelector('#signupNickname')
// const readFileSync = readFileSync() 
const info = {
    id: "sddss",
    pw: "0000",
    nickname: "dd"
}

const createSessionId = () => {
    const string =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789";
    let result = Array(30)
        .fill(0)
        .map((v) => (v = string[Math.floor(Math.random() * 62)]));
    return result.join("");
};

createSessionId()
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const infoJson = JSON.stringify(info)
    const dataBuffer = fs.readFileSync("user-json.json")

    const dataJson = dataBuffer.toString()

    const data = JSON.parse(dataJson)
    data.id = signupId.value
    data.pw = signupPw.value
    data.nickname = signupNickname.value

    const chalJson = JSON.stringify(infoJson)
    fs.writeFileSync('user-json.json', chalJson)
})
