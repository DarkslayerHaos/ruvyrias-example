# 🎧 Music Bot — Example with Ruvyrias

> This example is built entirely with **Slash Commands**, using an **individual event handler system** for both [Ruvyrias](https://www.npmjs.com/package/ruvyrias) and [discord.js]. It also includes a **command handler** to keep everything modular and clean.  
> Powered by the latest version of **Ruvyrias**, the Lavalink library which this bot is designed to demonstrate.

## 🚀 Setting Up The Environment

* It is necessary to have [NodeJS](https://nodejs.org/en/download/current/) version 16.9x or higher installed.
* After downloading/cloning the repository, use the command `npm install` to install all dependencies.
* Inside the `src/settings` folder, rename the `.env.example` file to `.env` and insert your bot's **token** into it.

```yaml
CLIENT_TOKEN=bot-token
CLIENT_ID=bot-id
GUILD_ID=guild-id
```

## 💡 Configure Lavalink
* To tailor the bot to your specific needs, you must adjust the Lavalink server settings. Locate the configuration file in the following directory:
```
├── 📁 ruvyrias-example
|  └── 📁 src
|     └── 📁 settings
|        └── 📄 config.ts
```
* Insert the fields below according to your needs:
```
{
    name: 'main',
    host: 'localhost',
    port: 80,
    auth: 'youshallnotpass',
    secure: false,
}
```

* If you've done everything correctly, now you just need to use the command `npm start`, and your bot should come online.

## 🎶 Music Commands

* Once the bot is online, you can use the following music commands:

| Command                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| `/play <link or song-name>`     | Play a song by providing a link or the name of the song.              |
| `/pause`                        | Pause the currently playing track.                                    |
| `/resume`                       | Resume playback.                                                      |
| `/skip`                         | Skip to the next track in the queue.                                  |
| `/stop`                         | Stop the music and clear the queue.                                   |
| `/queue`                        | Display the current music queue.                                      |
| `/playprevious`                 | Play the previously played track.                                     |
| `/loop`                         | Toggle loop mode for the entire queue.                                |
| `/volume <1-1000>`              | Adjust the volume of the music.                                       |