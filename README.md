
# Discord Bot

A custom discord bot created for my discord server.




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`TOKEN` = `YOUR_BOT_TOKEN`

`CLIENT_ID` = `YOUR_CLIENT_ID`

`APEX_API_KEY` = `YOUR_APEX_API_KEY` - https://apexlegendsapi.com/

Required for Apex Legends API:

`WEBHOOK_ID` = `YOUR_WEBHOOK_ID`

`WEBHOOK_TOKEN` = `YOUR_WEBHOOK_TOKEN`


## Run Locally

Clone the project

```bash
  git clone https://github.com/caciuleanuciprian/discord-bot.git
```

Go to the project directory

```bash
  cd discord-bot
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node .
```


## Supported commands

Music
- /play [song, playlist, search] - Plays a song/playlist
- /pause - Pauses current song
- /resume - Resumes current song
- /skip - Skips current song
- /stop - Stops current song
- /queue - Shows the first 10 songs in the queue

Apex Legends
- /map [current/next] - Shows the current/next map.
- /crafting - Shows the current crafting rotation.


## Roadmap

✅ Add music commands

✅ Add Apex Legends related information using Apex Legends API

⬜️ Add a meme generator

⬜️ Add minigames

⬜️ Add League of Legends related stats using Riot Games API

