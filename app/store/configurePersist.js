// copied from https://github.com/doomsower/react-native-template-starter/blob/ddbd615557b90a64f0265ed0c1ae0d6f550bd4fa/src/core/config/configurePersist.js
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

const STORE_CONFIG = {
  version: '123',
  config: {
    storage: AsyncStorage,
    whitelist: ['auth', 'form']
  }
};

export default async function configurePersist(store) {
  const { version, config } = STORE_CONFIG;
  try {
    const localVersion = await AsyncStorage.getItem('storeVersion');
    if (localVersion === version) {
      persistStore(store, config);
    } else {
      persistStore(store, config).purge();
      AsyncStorage.setItem('storeVersion', version);
    }
  } catch (error) {
    persistStore(store, config).purge();
    AsyncStorage.setItem('storeVersion', version);
  }
}
