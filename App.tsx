import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Weather from './components/Weather';
import News from './components/News';
import AudioStream from './components/AudioStream';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.componentContainer}>
        <View style={styles.leftContainer}>
          <AudioStream />
          <View style={styles.weatherContainer}>
              <Weather/>
          </View>
        </View>
        <View style={styles.stackedComponents}>
          <View style={styles.newsContainer}>
            <News/>
          </View>
          {/* <View style={styles.weatherContainer}>
            <Weather/>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: '#fff',
  },
  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
     backgroundColor: '#000',
     width: '100%',
     height: '100%',
   }, 
   leftContainer : {
    flex: 1,
   },
   stackedComponents: {
    flex: 1,
    marginLeft: '10%',
    backgroundColor: '#000',
   },
  weatherContainer: {
    
  },
  audioContainer: {
    flex: 1,
    width: '33%',
    backgroundColor: 'green',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  newsContainer: {
    flex: 1,
  },
});
