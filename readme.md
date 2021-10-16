# Intro

Yet anther Find A Seat for mcgill students, but:

- Runs on Firebase as a cloud function
- Can be self-hosted for free
- Sends notification to Telegram (free & fast)

If you don't use Telegram, you can easily modify the code to send to

- Messenger
- Instagram
- ...

# How to Self-Deploy

1. Create a telegram bot

   1. Go to @BotFather
   2. /start to create your bot
   3. Save your bot's token
   4. Go to @get_id_bot
   5. Save your Chat ID

2. Create a firebase app
   1. install firebase tools in your local computer (follow firebase documentation)
   2. Set Default GCP resource location to northamerica-northeast1 in Firebase Project Settings
3. Download/Clone this Repo

   1. Put in your project name in `.firebaserc`

4. Set Environment Variables

```
firebase functions:config:set telegram.bot_token=[...]

firebase functions:config:set telegram.chat_id=[...]

// for example, COMP-303
firebase functions:config:set course.number=[...]

// for example, 202201 or 202209
firebase functions:config:set course.term=[...]
```

5. Deploy the cloud functions to Firebase

# How to Use

There are two cloud functions. The only difference is the trigger.

1. `auto_find`

   Scheduled to run every five minutes in the background to check for you
   
2. `manual_find`
   
   You can curl a url to make it check it for you


When availability is found, the cloud function will send you a Telegram message.

## Disclaimer

Use at your own risk.
