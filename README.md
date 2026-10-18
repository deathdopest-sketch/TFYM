# 🌸 TFYM / Audacity AI Companion (Chaturbate Edition)

Welcome to Audacity! She is a custom AI companion designed to manage your Chaturbate room, engage with your regulars, track tips, and keep your community hype.

**No technical experience? No problem!** This guide will walk you through everything from "What is AI?" to getting her live in your room.

---

## 🚀 Quick Start (The "Just Make It Work" Version)

### 1. Install the Basics
You need three things on your computer to run the bot:
1. **Node.js**: The engine that runs the bot. [Download "LTS" version here](https://nodejs.org/).
2. **Ollama**: The "brain" (AI) that lives on your computer so you don't have to pay monthly fees. [Download Ollama here](https://ollama.com/).
3. **Chrome Browser**: The bot uses a hidden version of Chrome to "see" your chat.

### 2. Set Up the Brain (Ollama)
Once Ollama is installed:
1. Open your terminal (search for `cmd` or `PowerShell` in Windows).
2. Type this and press Enter:
   ```bash
   ollama run mara
   ```
   *(Note: If you are using a custom model name, replace 'mara' with your model's name. Once you see a `>>>` prompt, the brain is ready!)*

### 3. Configure the Bot
1. Find the file named `.env.cb.example` in the bot folder.
2. **Rename it** to exactly `.env.cb` (remove the `.example` part).
3. Open `.env.cb` with Notepad and fill in your details:
   - `CB_PASSWORD`: Your Chaturbate password.
   - `AI_KEY`: (If you are using a cloud brain) otherwise leave as default.
   - `ROOM_NAME`: Your Chaturbate username.

### 4. Launch!
1. Open your terminal in the bot folder.
2. Type this to install the parts:
   ```bash
   npm install
   ```
3. Type this to start the bot:
   ```bash
   npm run start:chaturbate
   ```

---

## 🖥️ Control Center (GUI)
This bot comes with a built-in Control Center to monitor everything in real-time.
To launch the GUI:
```bash
npm start
```
**Features:**
- **Real-time Monitor**: Watch the bot sniff chat messages from other sites.
- **Identity Settings**: Set your own username so the bot knows who to learn from.
- **Training Modes**: Switch between training on yourself, others, or everyone.

---

## 🛠️ What Audacity Does For You

- **Tip Tracking**: She acknowledges tips and adds people to the "Regulars" list automatically.
- **The Roster**: She keeps track of your top supporters and high-performers.
- **Mod Powers**: She can handle banned words and spam so you don't have to.
- **Persona**: She's not a generic bot; she's programmed with the Mara personality—dark, intelligent, and magnetic.
- **Cross-Site Learning**: She can sniff other chat sites to learn how users interact and refine her responses.

---

## ❓ Common Questions

**"What is a .env file?"**
It's a secret notebook where the bot stores your passwords and settings. Never share this file with anyone!

**"Does the bot actually take over my account?"**
No. She uses a "Puppeteer" connection, which is like a robotic browser that reads the chat and types responses, just like a human mod would.

**"Why is the bot not replying?"**
- Check if Ollama is running in the background (look for the little llama icon in your system tray).
- Make sure your `.env.cb` file has the correct password.
- Ensure you ran `npm install` before starting.

---

## 🆘 Need Help?
If something breaks, check the terminal window. If you see a bunch of red text, copy it and send it to your developer!
