export default class OmneediaRealtime {
  protected Channel: string = ''
  protected ref: any = null
  constructor(channel: string, ref: any) {
    this.Channel = channel
    this.ref = ref
  }
  public async send(message: any) {
    this.ref.socket.emit(this.Channel + '::' + message.type + '::' + message.event, message.payload)
    return this
  }
  public on(type: string, event: any, cb: Function) {
    this.ref.socket.on(`${this.Channel}::${type}::${event.event}`, cb)
    return this
  }
  public subscribe(callback: Function) {
    this.ref.socket.on(`${this.Channel}:SUBSCRIBED`, callback)
    this.ref.socket.emit('subscribe', this.Channel)
    return this
  }
}
