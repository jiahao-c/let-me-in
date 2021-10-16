# Intro

Yet anther Find A Seat for mcgill students, but:

- Runs on Firebase
- Can be self-hosted for free
- Sends notification to Telegram (free & fast)

If you don't use Telegram, you can easily modify the code to send to

- Messenger
- Instagram
- ...

# How to Self-Deploy

1. Create a firebase app
2. Use this repo as a cloud function
3. Set Environment Variables

```
firebase functions:config:set telegram.bot_token=[...]
```

```
firebase functions:config:set telegram.chat_id=[...]
```

```
firebase functions:config:set course.number=[...]
```

```
firebase functions:config:set course.term=[...]
```

4. Deploy on Firebase
