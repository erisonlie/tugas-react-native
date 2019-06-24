/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RootApp from './src/RootApp.js'
import WithScroll from './src/WithScroll.js'
import Test from './src/test.js'
import Instagram from './src/Instagram.js'
import BottomTabTugas2 from './src/TUGAS2/BottomTab'

AppRegistry.registerComponent(appName, () => BottomTabTugas2);
