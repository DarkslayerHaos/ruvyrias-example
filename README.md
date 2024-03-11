## 🚀 Setting Up The Environment

* It is necessary to have [NodeJS](https://nodejs.org/en/download/current/) version 16.9x or higher installed.
* After downloading/cloning the repository, use the command `npm install` to install all dependencies.
* Inside the `src/settings` folder, rename the `.env.example` file to `.env` and insert your bot's **token** into it.

```yaml
TOKEN=bot-token
PREFIX=.
```

## 💡 Configure Lavalink
* To tailor the bot to your specific needs, you must adjust the Lavalink server settings. Locate the configuration file in the following directory:
```
├── 📁 music-bot
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
    password: 'youshallnotpass',
    secure: false,
}
```

* If you've done everything correctly, now you just need to use the command `npm start`, and your bot should come online.

## 🎶 Music Commands

* Once the bot is online, you can use the following music commands:

| Command                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| `.play <link | song-name>`      | Play a song by providing a link or the name of the song.              |
| `.pause`                        | Pause the currently playing track.                                    |
| `.resume`                       | Resume playback.                                                      |
| `.skip`                         | Skip to the next track in the queue.                                  |
| `.stop`                         | Stop the music and clear the queue.                                   |
| `.queue`                        | Display the current music queue.                                      |
| `.repeat`                       | Show information about the currently playing track.                   |
| `.playprevious`                 | Play the previously played track.                                     |
| `.loop`                         | Toggle loop mode for the entire queue.                                |
| `.bassboost`                    | Enhance the bass of the music.                                        |
| `.save`                         | Save the currently playing track and send the link in DM to the user. |
| `.volume <1-100>`               | Adjust the volume of the music.                                       |