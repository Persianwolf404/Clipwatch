const clipboardHistory: string[] = [];
const MAX_HISTORY_LENGTH = 50;

export const addToHistory = (text: string): void => {
  if (clipboardHistory[clipboardHistory.length - 1] === text) return;

  clipboardHistory.push(text);
  if (clipboardHistory.length > MAX_HISTORY_LENGTH) {
    clipboardHistory.shift();
  }
};

export const getClipboardHistory = (): string[] => [...clipboardHistory];

export const clearClipboardHistory = (): void => {
  clipboardHistory.length = 0;
};

export const exportClipboardHistory = (): string => JSON.stringify(clipboardHistory);

export const importClipboardHistory = (json: string): void => {
  try {
    const importedHistory = JSON.parse(json);
    if (Array.isArray(importedHistory)) {
      clipboardHistory.length = 0;
      clipboardHistory.push(...importedHistory.slice(-MAX_HISTORY_LENGTH));
    }
  } catch (error) {
    console.error('Failed to import clipboard history:', error);
  }
};