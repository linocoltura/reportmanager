import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
// import View from '../Containers/View'
import RapportenScreen from '../Containers/RapportenScreen'
import AfsprakenScreen from '../Containers/AfsprakenScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// // Manifest of possible screens
// const PrimaryNav = StackNavigator({
//   // View: { screen: View },
//   RapportenScreen: { screen: RapportenScreen },
//   AfsprakenScreen: { screen: AfsprakenScreen },
//   // LaunchScreen: { screen: LaunchScreen }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'AfsprakenScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// })

export default TabNavigator({
  Afspraken: { screen: AfsprakenScreen },
  Rapporten: { screen: RapportenScreen },
}, {
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    indicatorStyle: styles.indicatorStyle,
  }
});
