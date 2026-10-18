'use strict';

/**
 * BotConfig — Central configuration for the TFYM build.
 * Handles model selection and training preferences.
 */

const path = require('path');
const fs = require('fs');

const CONFIG_PATH = path.join(__dirname, 'config.json');

const DEFAULT_CONFIG = {
  ai: {
    host: '127.0.0.1:11434',
    model: 'mara',
    fallbackModel: 'llama3',
    fastModel: 'llama3.2:1b',
    timeoutMs: 60000
  },
  training: {
    myUsername: '',
    mode: 'self', // 'self' | 'others' | 'all'
    enabled: true
  },
  chaturbate: {
    roomName: ''
  }
};

class BotConfig {
  constructor() {
    this.data = this._load();
  }

  _load() {
    if (fs.existsSync(CONFIG_PATH)) {
      try {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
        return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
      } catch (e) {
        console.error('[BotConfig] Load failed, using defaults');
      }
    }
    return { ...DEFAULT_CONFIG };
  }

  save() {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(this.data, null, 2));
  }

  get(keyPath) {
    return keyPath.split('.').reduce((obj, key) => obj?.[key], this.data);
  }

  set(keyPath, value) {
    const keys = keyPath.split('.');
    let current = this.data;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    this.save();
  }
}

module.exports = new BotConfig();
