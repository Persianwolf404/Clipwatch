Here is a comprehensive `README.md` file for your library **Clipwatch**, including detailed documentation for all functions, features, usage examples, and installation instructions.

---

### README.md

```markdown
# Clipwatch

**Clipwatch** is a TypeScript utility library to monitor clipboard changes, manage clipboard history, and handle regex-based clipboard matching. It is designed for browser environments and provides robust clipboard monitoring features.

---

## Features

- Monitor clipboard changes in real-time.
- Avoid duplicate consecutive clipboard entries in history.
- Enable/disable private mode to stop saving clipboard history.
- Dynamically adjust polling intervals for clipboard monitoring.
- Manage clipboard history with export/import options.
- Trigger custom callbacks when clipboard text matches specific patterns.

---

## Installation

Install the library via npm:

```bash
npm install clipwatch
```

---

## Usage

### Importing Functions

You can import the functions directly from the library:

```typescript
import { startWatching, stopWatching, setThrottle, getClipboardHistory, addToHistory, clearClipboardHistory, exportClipboardHistory, importClipboardHistory, onClipboardChange, onClipboardMatch } from 'clipwatch';
```

---

## Functions Documentation

### Clipboard Monitoring

#### `startWatching(options?: { interval?: number; private?: boolean }): void`
Starts monitoring clipboard changes.

- **Parameters**:
  - `options` *(optional)*: Configuration object.
    - `interval` *(number)*: Polling interval in milliseconds (default: `1000`).
    - `private` *(boolean)*: Enable private mode (default: `false`).

- **Example**:
  ```typescript
  startWatching({ interval: 500, private: true });
  ```

---

#### `stopWatching(): void`
Stops monitoring clipboard changes.

- **Example**:
  ```typescript
  stopWatching();
  ```

---

#### `setThrottle(ms: number): void`
Dynamically adjusts the polling interval for clipboard monitoring.

- **Parameters**:
  - `ms` *(number)*: New polling interval in milliseconds.

- **Example**:
  ```typescript
  setThrottle(2000); // Change polling interval to 2 seconds
  ```

---

#### `getCurrentClipboard(): Promise<string>`
Reads the current text from the clipboard.

- **Returns**: A promise that resolves to the clipboard text.

- **Example**:
  ```typescript
  const clipboardText = await getCurrentClipboard();
  console.log(clipboardText);
  ```

---

### Clipboard History Management

#### `getClipboardHistory(): string[]`
Retrieves the clipboard history.

- **Returns**: An array of clipboard texts.

- **Example**:
  ```typescript
  const history = getClipboardHistory();
  console.log(history);
  ```

---

#### `addToHistory(text: string): void`
Adds a new entry to the clipboard history.

- **Parameters**:
  - `text` *(string)*: The clipboard text to add.

- **Example**:
  ```typescript
  addToHistory('New clipboard text');
  ```

---

#### `clearClipboardHistory(): void`
Clears all entries in the clipboard history.

- **Example**:
  ```typescript
  clearClipboardHistory();
  ```

---

#### `exportClipboardHistory(): string`
Exports the clipboard history as a JSON string.

- **Returns**: JSON string representation of the clipboard history.

- **Example**:
  ```typescript
  const exportedHistory = exportClipboardHistory();
  console.log(exportedHistory);
  ```

---

#### `importClipboardHistory(json: string): void`
Imports clipboard history from a JSON string.

- **Parameters**:
  - `json` *(string)*: JSON string representing the clipboard history.

- **Example**:
  ```typescript
  const historyJson = '[ "Clipboard text 1", "Clipboard text 2" ]';
  importClipboardHistory(historyJson);
  ```

---

### Event Handling

#### `onClipboardChange(callback: (text: string) => void): void`
Registers a callback for clipboard change events.

- **Parameters**:
  - `callback` *(function)*: Function to execute when clipboard text changes. Receives the new clipboard text as an argument.

- **Example**:
  ```typescript
  onClipboardChange((text) => {
    console.log(`Clipboard changed: ${text}`);
  });
  ```

---

#### `onClipboardMatch(pattern: RegExp, callback: (match: string) => void): void`
Registers a callback for clipboard text that matches a specific regex pattern.

- **Parameters**:
  - `pattern` *(RegExp)*: Regular expression to match clipboard text.
  - `callback` *(function)*: Function to execute when clipboard text matches the pattern. Receives the matched text as an argument.

- **Example**:
  ```typescript
  onClipboardMatch(/http(s)?:\/\/\S+/i, (url) => {
    console.log(`URL found in clipboard: ${url}`);
  });
  ```

---

## Full Example

Here’s how you can use the library:

```typescript
import { startWatching, stopWatching, setThrottle, getClipboardHistory, addToHistory, clearClipboardHistory, exportClipboardHistory, importClipboardHistory, onClipboardChange, onClipboardMatch } from 'clipwatch';

// Start monitoring clipboard changes
startWatching({ interval: 1000, private: false });

// Register a callback for clipboard changes
onClipboardChange((text) => {
  console.log(`Clipboard changed: ${text}`);
});

// Register a regex matcher
onClipboardMatch(/error/i, (match) => {
  console.log(`Error found in clipboard: ${match}`);
});

// Change polling interval dynamically
setThrottle(2000);

// Get clipboard history
console.log(getClipboardHistory());

// Export clipboard history as JSON
const exportedHistory = exportClipboardHistory();
console.log(exportedHistory);

// Import clipboard history from JSON
importClipboardHistory('["Clipboard text 1", "Clipboard text 2"]');

// Stop monitoring clipboard changes
stopWatching();
```

---

## Requirements

- **Browser Environment**: The library relies on the `navigator.clipboard` API.
- **Secure Context**: Clipboard API requires HTTPS or localhost.

---

## Limitations

- **Browser Compatibility**: Ensure the browser supports the `navigator.clipboard` API.
- **Permission Handling**: Clipboard access requires user permission.

---

## Contributing

Contributions are welcome! Please submit issues or pull requests to the [GitHub repository](https://github.com/Persianwolf404/clipwatch).

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by [Persianwolf404](https://github.com/Persianwolf404).

---

## Keywords

- Clipboard
- Utility
- TypeScript
- Clipboard Monitor
- Open-Source
```
