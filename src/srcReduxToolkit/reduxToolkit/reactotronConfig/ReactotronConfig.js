import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../constants/constants';

Reactotron.useReactNative()
  .configure({ name: 'app_name' })
  .use(reactotronRedux()) //  <- here i am!
  .setAsyncStorageHandler(AsyncStorage) // <- here!
  .use(
    // optional if using MMKV library
    mmkvPlugin({
      storage, // mmkv instance
      ignore: ['persist:root', 'secret'],
      // "persist:root" key will avoid showing redux persist update everytime redux persist
      // mmkvPlugin() accepts an object with an ignore key. The value is an array of strings you would like to prevent sending to Reactotron.
    })
  )
  .connect();

export default Reactotron;
