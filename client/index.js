// 引入WebSocket类
const { WebSocket } = require("ws");
// 引入内置模块readline
const readline = require('readline');

// 创建readline实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// 创建webSocket
const ws = new WebSocket("ws://127.0.0.1:8124");

let userName = '匿名';
// 连接成功建立
ws.on('open', () => {
    console.log('连接成功！');
    rl.question("请输入昵称：", (name) => {
        // 输入有效，则将用户输入的昵称存入全局变量
        name && (userName = name);
        // 读取输入
        rl.on('line', (input) => {
            // 将用户输入发送给服务器，每次捎带上用户名
            if (input) {
                ws.send(userName + ":" + input);
            }
        })
    })

})

// 监听消息
ws.on("message", function message(data) {
    console.log(data.toLocaleString());
});

// 监听错误
ws.on("error", console.error);