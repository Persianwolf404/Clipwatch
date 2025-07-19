import { EventEmitter } from './events';

export const onClipboardMatch = (regex: RegExp, callback: (matched: string) => void): void => {
  EventEmitter.on('clipboardChange', (text: string) => {
    const match = text.match(regex);
    if (match) callback(match[0]);
  });
};