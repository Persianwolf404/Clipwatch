import { EventEmitter, onClipboardChange } from '../events';

describe('events.ts tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should register and emit clipboardChange events', () => {
    const mockCallback = jest.fn();
    onClipboardChange(mockCallback);

    EventEmitter.emit('clipboardChange', 'Test Clipboard Text');

    expect(mockCallback).toHaveBeenCalledWith('Test Clipboard Text');
  });

  test('should handle multiple callbacks for the same event', () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();

    onClipboardChange(mockCallback1);
    onClipboardChange(mockCallback2);

    EventEmitter.emit('clipboardChange', 'Another Clipboard Text');

    expect(mockCallback1).toHaveBeenCalledWith('Another Clipboard Text');
    expect(mockCallback2).toHaveBeenCalledWith('Another Clipboard Text');
  });
});