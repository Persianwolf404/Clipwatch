import { startWatching, stopWatching, setThrottle, getCurrentClipboard } from '../watch';
import { onClipboardChange, EventEmitter } from '../events';
import { getClipboardHistory, clearClipboardHistory, addToHistory } from '../history';

jest.mock('../events', () => {
 const events: Record<string, ((...args: any[]) => void)[]> = {};

 const mockEventEmitter = {
 on: jest.fn((event: string, callback: (...args: any[]) => void) => {
 if (!events[event]) events[event] = [];
 events[event].push(callback);
 }),
 emit: jest.fn((event: string, ...args: any[]) => {
 if (events[event]) {
 events[event].forEach((callback) => {
 callback(...args);
 });
 }
 }),
 };

 return {
 EventEmitter: mockEventEmitter,
 onClipboardChange: jest.fn((callback: (text: string) => void) => {
 mockEventEmitter.on('clipboardChange', callback);
 }),
 };
});

jest.mock('../history', () => {
 let clipboardHistory: string[] = [];

 return {
 getClipboardHistory: jest.fn(() => clipboardHistory),
 clearClipboardHistory: jest.fn(() => {
 clipboardHistory = [];
 }),
 addToHistory: jest.fn((text: string) => {
 if (clipboardHistory.length === 0 || clipboardHistory[clipboardHistory.length - 1] !== text) {
 clipboardHistory.push(text);
 }
 }),
 };
});

Object.defineProperty(global.navigator, 'clipboard', {
 value: {
 readText: jest.fn(() => Promise.resolve('')),
 },
 writable: true,
});

async function waitForAsyncInterval() {
 await Promise.resolve();
 await Promise.resolve();
}

describe('watch.ts tests', () => {
 const mockClipboard = jest.spyOn(navigator.clipboard, 'readText');

 beforeEach(() => {
 jest.useFakeTimers();

 (clearClipboardHistory as jest.Mock).mockClear();
 (getClipboardHistory as jest.Mock).mockClear();
 (addToHistory as jest.Mock).mockClear();
 (EventEmitter.emit as jest.Mock).mockClear();
 (EventEmitter.on as jest.Mock).mockClear();

 (clearClipboardHistory as jest.Mock)();
 });

 afterEach(() => {
 jest.useRealTimers();
 stopWatching();
 });

 test('should start watching clipboard changes', async () => {
 const mockCallback = jest.fn();
 
 onClipboardChange(mockCallback);

 mockClipboard.mockResolvedValue('Hello World');
 startWatching({ interval: 100 });

 jest.advanceTimersByTime(100);
 await waitForAsyncInterval();

 expect(mockCallback).toHaveBeenCalledWith('Hello World');
 expect(getClipboardHistory()).toContain('Hello World');
 });

 test('should not add duplicate consecutive entries to history', async () => {
 mockClipboard.mockResolvedValue('Duplicate Text');
 startWatching({ interval: 100 });

 jest.advanceTimersByTime(100);
 await waitForAsyncInterval();

 jest.advanceTimersByTime(100);
 await waitForAsyncInterval();

 expect(getClipboardHistory()).toEqual(['Duplicate Text']);
 });

 test('should respect private mode by not saving clipboard history', async () => {
 mockClipboard.mockResolvedValue('Private Text');
 startWatching({ interval: 100, private: true });

 jest.advanceTimersByTime(100);
 await waitForAsyncInterval();

 expect(getClipboardHistory()).toEqual([]);
 });

 test('should change polling interval dynamically', async () => {
 const mockCallback = jest.fn();
 
 onClipboardChange(mockCallback);

 mockClipboard.mockResolvedValue('Initial Text');
 startWatching({ interval: 100 });

 jest.advanceTimersByTime(100);
 await waitForAsyncInterval();

 expect(mockCallback).toHaveBeenCalledWith('Initial Text');

 setThrottle(500);
 mockClipboard.mockResolvedValue('New Text');
 jest.advanceTimersByTime(500);
 await waitForAsyncInterval();

 expect(mockCallback).toHaveBeenCalledWith('New Text');
 });

 test('should read the current clipboard text', async () => {
 mockClipboard.mockResolvedValueOnce('Current Clipboard');
 const clipboardText = await getCurrentClipboard();

 expect(clipboardText).toBe('Current Clipboard');
 });

 test('should stop watching clipboard changes', async () => {
 const mockCallback = jest.fn();
 onClipboardChange(mockCallback);

 mockClipboard.mockResolvedValue('Test Text');
 startWatching({ interval: 100 });
 stopWatching();

 jest.advanceTimersByTime(100);
 await waitForAsyncInterval();

 expect(mockCallback).not.toHaveBeenCalled();
 });
});