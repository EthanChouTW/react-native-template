/**
 * This exposes the native parse module as a JS module.
 * Function list:
 * 1. updateParseInstallation(String userId)
 * 2. unSubscribeAllParseChannels()
 * 3. stopAlarm()
 */
import { NativeModules } from 'react-native';

module.exports = NativeModules.ParseModule;
