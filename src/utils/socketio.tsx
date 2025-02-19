import io from 'socket.io-client'

export class WebSocketClient {
  static eventObj: any;
  static instance: any;

  constructor() {
    if (!WebSocketClient.eventObj) {
      WebSocketClient.eventObj = {}
    }
    if (!WebSocketClient.instance) {
      this.initWebSocket()
    }
  }

  initWebSocket() {
    // 初始化实例
    WebSocketClient.instance = io.connect(process.env.VITE_SOCKET_BASE_URL, {
      path: '/socket.io/',
      query: { EIO: 3 },
      transports: ["websocket"],
      reconnectionAttempts: 12,
    })
    // 建立连接
    WebSocketClient.instance.on('connect', () => {
      console.log('socket connected', WebSocketClient.instance.id)
      for (const objKey in WebSocketClient.eventObj) {
        if (WebSocketClient.eventObj.hasOwnProperty(objKey)) {
          const { event, obj } = WebSocketClient.eventObj[objKey]
          this.emit(event, obj)
        }
      }
    })
    // 连接断开
    WebSocketClient.instance.on('disconnect', (data: any) => {
      console.log('socket disconnect due to', data)
    })
    // 连接错误
    WebSocketClient.instance.on('connect_error', (data: any) => {
      console.log('socket connect error', data)
    })
    // 重连失败
    WebSocketClient.instance.on('reconnect_failed', (data: any) => {
      console.log('socket reconnect failed', data)
    })
  }

  emit(event: string, obj: any) {
    if (!WebSocketClient.instance) return
    if ((WebSocketClient.instance && WebSocketClient.instance.connected)) {
      console.log(`send ${event}`, obj)
      WebSocketClient.instance.emit(event, JSON.stringify(obj))
    } else {
      WebSocketClient.eventObj[event] = { event, obj }
    }
  }

  on(event: string, callback: Function) {
    if (!WebSocketClient.instance) return
    WebSocketClient.instance.on(event, (data: any) => {
      console.log(`received ${event}`, JSON.parse(data))
      callback(JSON.parse(data))
    })
  }

  off(event: string) {
    if (!WebSocketClient.instance) return
    WebSocketClient.instance.off(event)
  }
}
