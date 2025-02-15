document.getElementById('loginForm').addEventListener('submit', function(event) {
    // 阻止表单的默认提交行为
    event.preventDefault();

    // 获取手机号和密码输入字段的引用
    var phoneInput = document.getElementById('phone');
    var passwordInput = document.getElementById('password');

    // 获取输入的值
    var phone = phoneInput.value;
    var password = passwordInput.value;
    var phoneRegex = /^[0-9]{11}$/; // 简单的手机号正则表达式
            var passwordRegex = /^[a-zA-Z0-9]{6,}$/; // 简单的密码正则表达式

            if (!phoneRegex.test(phone)) {
                alert("手机号格式不正确");
                return;
            }
            if (!passwordRegex.test(password)) {
                alert("密码格式不正确");
                return;
            }

            // 如果手机号和密码格式正确，发送到服务器验证
            // TODO: 发送数据到服务器进行验证
            console.log('手机号和密码格式正确');
        });
// 引入crypto-js库
const CryptoJS = require("crypto-js"); // 如果在Node.js环境中

// 定义一个函数来进行MD5加密
function encryptWithMD5(message) {
    // 使用CryptoJS的MD5方法进行加密
    const hash = CryptoJS.MD5(message).toString();
    return hash;
}
const  md5_password=encryptWithMD5(password);
    //
    fetch('http://localhost:3000/cellphone', {
        method: 'POST', // 指定请求方法为POST
        headers: {
            'Content-Type': 'application/json', // 设置请求头，指示发送JSON数据
        },
        body: JSON.stringify({ phone: document.getElementById('phone').value }) // 将手机号作为JSON数据发送
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 解析JSON响应体
    })
    .then(data => {
        console.log(data); // 打印从服务器接收到的数据
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error); // 打印错误信息
    });