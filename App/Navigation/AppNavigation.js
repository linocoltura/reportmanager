import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import NieuwRapportScreen from '../Containers/NieuwRapportScreen'
import RapportDetailScreen from '../Containers/RapportDetailScreen'
import AfspraakDetailScreen from '../Containers/AfspraakDetailScreen'
// import View from '../Containers/View'
import RapportenScreen from '../Containers/RapportenScreen'
import AfsprakenScreen from '../Containers/AfsprakenScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'


// RapportDetailScreen: { screen: RapportDetailScreen }
// AfspraakDetailScreen: { screen: AfspraakDetailScreen }

  const AfsprakenStack = StackNavigator({
    Overzicht: { screen: AfsprakenScreen },
    Detail: { screen: AfspraakDetailScreen },
    NieuwRapport: { screen: NieuwRapportScreen },
  },{
    navigationOptions: {
      header: null,
    }
  });

  const RapportenStack = StackNavigator({
    Overzicht: { screen: RapportenScreen },
    Detail: { screen: RapportDetailScreen },
  },{
    navigationOptions: {
      header: null,
    }
  });

export default TabNavigator({
  Afspraken: { screen: AfsprakenStack },
  Rapporten: { screen: RapportenStack },
}, {
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    indicatorStyle: styles.indicatorStyle,
  }
});
