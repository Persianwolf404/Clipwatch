type EventCallback = (...args: any[]) => void;

class EventEmitterClass {
  private events: Record<string, EventCallback[]> = {};

  on(event: string, callback: EventCallback): void {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  emit(event: string, ...args: any[]): void {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(...args));
    }
  }
}

export const EventEmitter = new EventEmitterClass();

export const onClipboardChange = (callback: (text: string) => void): void => {
  EventEmitter.on('clipboardChange', callback);
};