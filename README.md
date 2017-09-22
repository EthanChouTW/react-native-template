# React-Native Merchant App

![master branch](https://img.shields.io/badge/master-:-blue.svg?style=social)
![Build Status](https://travis-ci.com/honestbee/HB-Merchant-App.svg?token=4uPQMu1iMK3pTcTA1QVA&branch=master)
[![Coverage Status](https://coveralls.io/repos/github/honestbee/HB-Merchant-App/badge.svg?branch=master&t=JMUhpn)](https://coveralls.io/github/honestbee/HB-Merchant-App?branch=master)

![develop branch](https://img.shields.io/badge/develop-:-blue.svg?style=social)
![Build Status](https://travis-ci.com/honestbee/HB-Merchant-App.svg?token=4uPQMu1iMK3pTcTA1QVA&branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/honestbee/HB-Merchant-App/badge.svg?branch=develop&t=JMUhpn)](https://coveralls.io/github/honestbee/HB-Merchant-App?branch=develop)

## What is this repository for?

* ヽ( ° ▽°)ノ

## How do I get set up?
* go to Merchant App Project folder
* $brew install node
* $brew install watchman
* $brew update && brew cask install react-native-debugger
* $npm install -g yarn
* $yarn global add react-native-cli
* $yarn

### iOS
* $sudo gem install cocoapods
* $cd ios/ && pod install && cd ..
* $yarn run ios

### Android
* export Android sdk path in your shell config file

```
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/platform-tools/
export PATH=${PATH}:${ANDROID_HOME}/tools/
```

* $yarn run android-staging

```
Android build options:
- android-dev
- android-staging
- android-prod
```
* remember to permit the permission **drawing over other apps**

### Web

* $npm install react-native-web webpack-shell-plugin
* $npm install -g nwb electron
* $nwb react run index.web.js
