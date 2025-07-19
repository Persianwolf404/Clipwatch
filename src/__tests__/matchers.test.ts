import { EventEmitter } from '../events';
import { onClipboardMatch } from '../matchers';

describe('matchers.ts tests', () => {
  test('should trigger callback when clipboard matches regex', () => {
    const mockCallback = jest.fn();

    onClipboardMatch(/test/i, mockCallback);

    EventEmitter.emit('clipboardChange', 'This is a test');
    EventEmitter.emit('clipboardChange', 'No match here');

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('test');
  });

  test('should handle multiple matches', () => {
    const mockCallback = jest.fn();

    onClipboardMatch(/(test|example)/i, mockCallback);

    EventEmitter.emit('clipboardChange', 'This is a test');
    EventEmitter.emit('clipboardChange', 'Here is an example');
    EventEmitter.emit('clipboardChange', 'Nothing matches');

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith('test');
    expect(mockCallback).toHaveBeenCalledWith('example');
  });
});