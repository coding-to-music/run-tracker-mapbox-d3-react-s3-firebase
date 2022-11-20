# run-tracker-mapbox-d3-react-s3-firebase

# 🚀 Run Tracker is an intuitive and fully featured route planner and activity tracker 🚀

https://github.com/coding-to-music/run-tracker-mapbox-d3-react-s3-firebase

From / By https://github.com/erikguntner/rtnt

## Environment variables:

```java
# next.config.js

require('dotenv').config();

module.exports = {
  env: {
    GRAPH_HOPPER_KEY: process.env.GRAPH_HOPPER_KEY,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    PG_CONN_STRING: process.env.PG_CONN_STRING,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_KEY: process.env.PUSHER_KEY,
    PUSHER_SECRET: process.env.PUSHER_SECRET,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_DATABASE_URL: process.env.FB_DATABASE_URL,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGE_SENDER_ID: process.env.FB_MESSAGE_SENDER_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,
    NOW_URL: process.env.NOW_URL,
  },
};
```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/run-tracker-mapbox-d3-react-s3-firebase.git
git push -u origin main
```

# Run Tracker

Run Tracker is an intuitive and fully featured route planner and activity tracker. Any Run Tracker user is free to create custom routes and export them to GPX files; or, by signing up for an account, users will have the ability to save routes, as well as track their bike runs and walks.

Check out the application at [rtnt.now.sh](https://rtnt.now.sh/) or read on to learn more about thea available features.

## Features

- **Dynamic Mapping:** Click around the map to to plot points for your desired route
- **Elevation Graph:** View the changes in elevation along your route
- **Save Routes:** By creating an account, you can save your routes and revisit them before going for a run
- **Log Activities:** From your dashboard, go to the log runs tab fill out the form to submit the run you just went on. These can all be in the run log tab
- **Set Goals:** Set your weekly goals and watch the bar fill up as you log runs for the week
- **Monthly Charts:** A bar chart of your runs every month allows you to see how far you have come as a runner
