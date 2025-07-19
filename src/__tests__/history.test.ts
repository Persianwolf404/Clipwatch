import { getClipboardHistory, addToHistory, clearClipboardHistory, exportClipboardHistory, importClipboardHistory } from '../history';

describe('history.ts tests', () => {
  beforeEach(() => {
    clearClipboardHistory();
  });

  test('should add clipboard text to history', () => {
    addToHistory('Text 1');
    addToHistory('Text 2');

    expect(getClipboardHistory()).toEqual(['Text 1', 'Text 2']);
  });

  test('should not add duplicate consecutive entries to history', () => {
    addToHistory('Duplicate Text');
    addToHistory('Duplicate Text');

    expect(getClipboardHistory()).toEqual(['Duplicate Text']);
  });

  test('should clear clipboard history', () => {
    addToHistory('Text 1');
    clearClipboardHistory();

    expect(getClipboardHistory()).toEqual([]);
  });

  test('should export clipboard history as JSON', () => {
    addToHistory('Text 1');
    addToHistory('Text 2');

    const exportedHistory = exportClipboardHistory();
    expect(exportedHistory).toBe(JSON.stringify(['Text 1', 'Text 2']));
  });

  test('should import clipboard history from JSON', () => {
    const exportedHistory = JSON.stringify(['Imported Text 1', 'Imported Text 2']);
    importClipboardHistory(exportedHistory);

    expect(getClipboardHistory()).toEqual(['Imported Text 1', 'Imported Text 2']);
  });

  test('should respect history length limit', () => {
    for (let i = 0; i < 55; i++) {
      addToHistory(`Text ${i}`);
    }

    expect(getClipboardHistory().length).toBe(50); 
    expect(getClipboardHistory()[0]).toBe('Text 5'); 
  });
});