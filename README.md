## What is this repository for?

* ヽ( ° ▽°)ノ

## How do I get set up?
* go to Project folder
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
