// 引入WebSocketServer类
const { WebSocketServer } = require('ws');

// 自定义端口号
const PORT = 8124;

// 创建并启动WebSocket服务器，监听PORT端口号
const wsServer = new WebSocketServer({ port: PORT }, () => {
    console.log("WebSocket服务端创建成功，地址为 ws://127.0.0.1:8124");
})

// 服务器监听connection事件，有客户端成功连接时触发
wsServer.on("connection", (ws) => {
    // 监听消息事件
    ws.on('message', (message) => {
        wsServer.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(message);
            }
        });
    });

    // 监听关闭事件
    ws.on('close', () => {
        console.log('客户端关闭！');
    });

    // 监听错误事件
    ws.on('error', (error) => {
        console.log('WebSocket error:', error);
    });
})
