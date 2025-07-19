import { EventEmitter } from './events';
import { addToHistory, clearClipboardHistory } from './history';

let intervalId: ReturnType<typeof setInterval> | null = null;
let pollingInterval = 1000; 
let lastClipboardText = '';
let privateMode = false;
let isProcessing = false;

export const startWatching = (options?: { interval?: number; private?: boolean }): void => {
  if (intervalId) stopWatching();

  pollingInterval = options?.interval ?? 1000;
  privateMode = options?.private ?? false;

  if (privateMode) clearClipboardHistory(); 

  intervalId = setInterval(async () => {
    if (isProcessing) return;
    isProcessing = true;

    try {
      const clipboardText = await getCurrentClipboard();
      console.log('Clipboard text read:', clipboardText); 

      if (clipboardText !== lastClipboardText) {
        lastClipboardText = clipboardText;
        console.log('Emitting clipboard change:', clipboardText);
        EventEmitter.emit('clipboardChange', clipboardText);
        if (!privateMode) {
          console.log('Adding to history:', clipboardText);
          addToHistory(clipboardText);
        }
      }
    } catch (error) {
      console.error('Error reading clipboard:', error);
    } finally {
      isProcessing = false;
    }
  }, pollingInterval);
};

export const stopWatching = (): void => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

export const setThrottle = (ms: number): void => {
  if (pollingInterval === ms) return;
  pollingInterval = ms;
  if (intervalId) {
    stopWatching();
    startWatching({ interval: pollingInterval });
  }
};

export const getCurrentClipboard = async (): Promise<string> => {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    console.error('Failed to read clipboard:', error);
    return '';
  }
};