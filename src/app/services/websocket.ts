import WebSocket from '@tauri-apps/plugin-websocket';

export async function connectWebSocket() {
    try {
        const ws = await WebSocket.connect('ws://127.0.0.1:8080');
        let fileData: any = [];

        ws.addListener((msg) => {
            if (msg.type === 'Text') {
                console.log('Received Text Message:', msg.data);
            } else if (msg.type === 'Binary') {
                console.log('Received Binary Message:', new Uint8Array(msg.data));
                fileData.push(new Uint8Array(msg.data));
            } else {
                console.log('Received Message:', msg);
            }
        });

        const request = {
            command: "read_audio_file",
            path: ""
        };

        await ws.send(JSON.stringify(request));

        // 添加适当的延迟，以确保消息能被接收
        setTimeout(async () => {
            await ws.disconnect();

            // 处理接收到的完整文件数据
            const totalLength = fileData.reduce((acc, curr) => acc + curr.length, 0);
            const combinedArray = new Uint8Array(totalLength);
            let offset = 0;
            for (const chunk of fileData) {
                combinedArray.set(chunk, offset);
                offset += chunk.length;
            }

            console.log('Complete file data:', combinedArray);
        }, 10000); // 10秒后断开连接

    } catch (error) {
        console.error('WebSocket connection error:', error);
    }
}

export async function fetchAudioFile(path: string) {
    try {
        const ws = await WebSocket.connect('ws://127.0.0.1:8080');
        let fileData = [];

        ws.addListener((msg) => {
            if (msg.type === 'Text') {
                console.log('Received Text Message:', msg.data);
            } else if (msg.type === 'Binary') {
                console.log('Received Binary Message:', new Uint8Array(msg.data));
                fileData.push(new Uint8Array(msg.data));
            } else {
                console.log('Received Message:', msg);
            }
        });

        const request = {
            command: "read_audio_file",
            path: path
        };

        await ws.send(JSON.stringify(request));

        // 添加适当的延迟，以确保消息能被接收
        setTimeout(async () => {
            await ws.disconnect();

            // 处理接收到的完整文件数据
            const totalLength = fileData.reduce((acc, curr) => acc + curr.length, 0);
            const combinedArray = new Uint8Array(totalLength);
            let offset = 0;
            for (const chunk of fileData) {
                combinedArray.set(chunk, offset);
                offset += chunk.length;
            }

            console.log('Complete file data:', combinedArray);
            return combinedArray;
        }, 10000); // 10秒后断开连接

    } catch (error) {
        console.error('WebSocket connection error:', error);
    }
}