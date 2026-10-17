'use strict';

/**
 * BrowserSniffer — Intercepts WebSockets and Network traffic using Puppeteer.
 * Designed to sniff chat messages from other sites (e.g., stumblechat.com) 
 * to provide training data for the AI.
 */

class BrowserSniffer {
  constructor(page, trainingCallback) {
    this.page = page;
    this.trainingCallback = trainingCallback; // function(sender, message) { ... }
    this._setupInterception();
  }

  async _setupInterception() {
    try {
      // This script runs inside the browser page and overrides the WebSocket constructor
      await this.page.evaluateOnNewDocument(() => {
        const OriginalWebSocket = window.WebSocket;
        
        window.WebSocket = function(url, protocols) {
          const ws = new OriginalWebSocket(url, protocols);
          
          // Intercept outgoing messages
          const originalSend = ws.send;
          ws.send = function(data) {
            window.dispatchEvent(new CustomEvent('ws-sniff-out', { detail: { url, data } }));
            return originalSend.apply(this, arguments);
          };

          // Intercept incoming messages
          ws.addEventListener('message', (event) => {
            window.dispatchEvent(new CustomEvent('ws-sniff-in', { detail: { url, data: event.data } }));
          });

          return ws;
        };
      });

      // Listen for the custom events dispatched from the browser
      this.page.on('console', msg => {
        // We can use console.log inside the page to send data back if preferred,
        // but CustomEvents + page.exposeFunction is cleaner.
      });

      // Expose a function to the browser to handle the sniffed data
      await this.page.exposeFunction('handleSniffedMessage', (direction, url, data) => {
        this._processMessage(direction, url, data);
      });

      // Inject a small script to forward CustomEvents to the exposed function
      await this.page.evaluate(() => {
        window.addEventListener('ws-sniff-in', e => window.handleSniffedMessage('IN', e.detail.url, e.detail.data));
        window.addEventListener('ws-sniff-out', e => window.handleSniffedMessage('OUT', e.detail.url, e.detail.data));
      });

      console.log('[BrowserSniffer] WebSocket interception active.');
    } catch (err) {
      console.error('[BrowserSniffer] Setup failed:', err);
    }
  }

  _processMessage(direction, url, data) {
    // Basic logic to detect chat messages. 
    // Most chat sites use JSON over WS.
    try {
      const parsed = JSON.parse(data);
      
      // This is a generic heuristic. Actual sites like StumbleChat 
      // will have specific fields like 'msg', 'text', 'content'.
      const message = parsed.text || parsed.msg || parsed.content || parsed.message || (typeof parsed === 'string' ? parsed : null);
      const sender = parsed.user || parsed.username || parsed.sender || 'unknown';

      if (message && message.length > 0) {
        if (this.trainingCallback) {
          this.trainingCallback(sender, message, url);
        }
      }
    } catch (e) {
      // Not JSON, might be raw text or binary.
      if (typeof data === 'string' && data.length > 1) {
        this._processMessage('RAW', url, JSON.stringify({ text: data, user: 'raw' }));
      }
    }
  }

  async navigateTo(url) {
    console.log(`[BrowserSniffer] Sniffing: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle2' });
  }
}

module.exports = BrowserSniffer;
