# YouTube Counter

## Install

In project root:
`npm install`

### Development (Optional)

`npm run-script watch`

### Build

`npm run-script build`
### Run on RPi

Make sure you have PM2 installed.
`npm run-script build`
Add your `google.creds.json`, `particle.creds.json`
Set your initial `data.cache.json` state
`sudo pm2 startup systemd -u pi`
in build folder run
`pm2 start index.js --cron "*/1 * * * *" --name Youtube-Counter`
