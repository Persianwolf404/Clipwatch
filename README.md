
# 📋 Clipwatch

<div align="center">

![Clipwatch Logo](https://img.shields.io/badge/Clipwatch-v1.0.0-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

**🚀 A powerful TypeScript utility library to monitor clipboard changes in real-time!**

[Installation](#-installation) • [Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation) • [Examples](#-examples)

</div>

---

## 🌟 Overview

**Clipwatch** is your go-to TypeScript library for clipboard monitoring! 🎯 Whether you're building a clipboard manager, password detector, or any app that needs clipboard awareness, Clipwatch has got you covered with its robust and easy-to-use API.

---

## ✨ Features

- 🔄 **Real-time Monitoring** - Watch clipboard changes as they happen
- 🚫 **Smart Duplicate Prevention** - No consecutive duplicate entries
- 🕵️ **Private Mode** - Monitor without saving history
- ⚡ **Dynamic Polling** - Adjust monitoring speed on-the-fly
- 📚 **History Management** - Full control over clipboard history
- 🎯 **Pattern Matching** - React to specific clipboard content with regex
- 💾 **Import/Export** - Save and restore clipboard history
- 🔒 **Secure** - Works only in secure contexts 

---

## 📦 Installation

Get started in seconds with npm:

```bash
npm install clipwatch
```

Or with yarn:

```bash
yarn add clipwatch
```

---

## 🚀 Quick Start

```typescript
import { startWatching, onClipboardChange } from 'clipwatch';

// Start monitoring - it's that simple! 🎉
startWatching();

// React to clipboard changes
onClipboardChange((text) => {
  console.log(`📋 New clipboard content: ${text}`);
});
```

---

## 📖 API Documentation

### 🔍 Clipboard Monitoring

#### `startWatching(options?)`
🟢 **Starts monitoring the clipboard for changes**

```typescript
startWatching({ 
  interval: 500,    // Check every 500ms ⚡
  private: true     // Don't save history 🕵️
});
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `interval` | `number` | `1000` | Polling interval in milliseconds |
| `private` | `boolean` | `false` | Enable private mode |

---

#### `stopWatching()`
🔴 **Stops clipboard monitoring**

```typescript
stopWatching(); // Pause monitoring 🛑
```

---

#### `setThrottle(ms)`
⚙️ **Dynamically adjust monitoring speed**

```typescript
setThrottle(2000); // Now checking every 2 seconds 🐢
```

---

#### `getCurrentClipboard()`
📋 **Get current clipboard content**

```typescript
const text = await getCurrentClipboard();
console.log(`Current: ${text}`); // 📝
```

---

### 📚 History Management

#### `getClipboardHistory()`
📜 **Retrieve all clipboard history**

```typescript
const history = getClipboardHistory();
// Returns: ['Text 1', 'Text 2', ...] 📚
```

---

#### `addToHistory(text)`
➕ **Manually add to history**

```typescript
addToHistory('Custom entry'); // ✍️
```

---

#### `clearClipboardHistory()`
🗑️ **Clear all history**

```typescript
clearClipboardHistory(); // Fresh start! 🌟
```

---

#### `exportClipboardHistory()`
💾 **Export history as JSON**

```typescript
const backup = exportClipboardHistory();
// Save to file, database, etc. 📦
```

---

#### `importClipboardHistory(json)`
📥 **Import history from JSON**

```typescript
importClipboardHistory(savedHistory); // Restore! 🔄
```

---

### 🎯 Event Handling

#### `onClipboardChange(callback)`
👂 **Listen for any clipboard change**

```typescript
onClipboardChange((text) => {
  console.log(`✨ Changed to: ${text}`);
});
```

---

#### `onClipboardMatch(pattern, callback)`
🎯 **React to specific patterns**

```typescript
// Detect URLs 🌐
onClipboardMatch(/https?:\/\/\S+/i, (url) => {
  console.log(`🔗 URL detected: ${url}`);
});

// Detect emails 📧
onClipboardMatch(/\S+@\S+\.\S+/, (email) => {
  console.log(`📧 Email found: ${email}`);
});

// Detect passwords 🔐
onClipboardMatch(/password:\s*(\S+)/i, (match) => {
  console.log(`🚨 Password detected!`);
});
```

---

## 💡 Examples

### 🎨 Complete Example

```typescript
import { 
  startWatching, 
  stopWatching, 
  onClipboardChange, 
  onClipboardMatch,
  getClipboardHistory,
  exportClipboardHistory 
} from 'clipwatch';

// 🚀 Start monitoring with custom settings
startWatching({ 
  interval: 500,
  private: false 
});

// 📢 Log all changes
onClipboardChange((text) => {
  console.log(`📋 Clipboard: ${text}`);
});

// 🔗 Detect and process URLs
onClipboardMatch(/https?:\/\/\S+/i, async (url) => {
  console.log(`🌐 Opening URL: ${url}`);
  // Could open in browser, validate, etc.
});

// 📧 Email detection
onClipboardMatch(/\S+@\S+\.\S+/, (email) => {
  console.log(`📮 Email copied: ${email}`);
});

// 💾 Save history before closing
window.addEventListener('beforeunload', () => {
  const history = exportClipboardHistory();
  localStorage.setItem('clipboardHistory', history);
  stopWatching(); // Clean up 🧹
});
```

### 🛡️ Privacy-Focused Usage

```typescript
// Monitor without saving history
startWatching({ private: true });

onClipboardChange((text) => {
  // Process sensitive data without storing
  if (text.includes('password')) {
    console.log('🔐 Sensitive data detected!');
  }
});
```

---

## ⚙️ Requirements

- 🌐 **Browser Environment** with `navigator.clipboard` API
- 🔒 **Secure Context** (HTTPS or localhost)
- 🎯 **TypeScript** 4.0+ (for development)

---

## ⚠️ Limitations

- 🌍 **Browser Support**: Modern browsers only (Chrome 66+, Firefox 63+, Safari 13.1+)
- 🔐 **Permissions**: User must grant clipboard access
- 📱 **Mobile**: Limited support on mobile browsers

---

## 🤝 Contributing

We love contributions! 💖 Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 Make your changes
4. ✅ Run tests (`npm test`)
5. 📝 Commit (`git commit -m 'Add amazing feature'`)
6. 🚀 Push (`git push origin feature/amazing-feature`)
7. 🎉 Open a Pull Request

Check out our [Contributing Guide](CONTRIBUTING.md) for more details!

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Persianwolf404

Permission is hereby granted, free of charge...
```

---

## 👨‍💻 Author

<div align="center">

Created with ❤️ by **[Persianwolf404](https://github.com/Persianwolf404)**
</div>

---

## 🏷️ Keywords

`clipboard` • `clipboard-monitor` • `clipboard-manager` • `typescript` • `clipboard-history` • `clipboard-watcher` • `clipboard-api` • `regex-matcher` • `event-emitter` • `browser-api` • `utility-library` • `open-source`

---

<div align="center">

### ⭐ Star us on GitHub!

If you find Clipwatch useful, please consider giving it a star! It helps others discover the project.

[![Star on GitHub](https://img.shields.io/github/stars/Persianwolf404/clipwatch.svg?style=social)](https://github.com/Persianwolf404/clipwatch)

</div>
