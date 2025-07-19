import { startWatching, stopWatching, setThrottle, getCurrentClipboard } from './watch';
import { onClipboardChange } from './events';
import { onClipboardMatch } from './matchers';
import { getClipboardHistory, clearClipboardHistory, exportClipboardHistory, importClipboardHistory } from './history';

export {
  startWatching,
  stopWatching,
  setThrottle,
  getCurrentClipboard,
  onClipboardChange,
  onClipboardMatch,
  getClipboardHistory,
  clearClipboardHistory,
  exportClipboardHistory,
  importClipboardHistory,
};