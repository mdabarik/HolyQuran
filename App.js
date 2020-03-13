
import React from 'react';
import { Text, Alert, Button, View, Image, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import surahEnglish from './data/quran-en.json';
import surahArabic from './data/quran-ar.json';

/*************************************************/
               // Home Screen
/*************************************************/
class HomeScreen extends React.Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  renderSurah = (surahs) => {
    return surahs.map(surah => {
      return (    
         <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Details', {
              name: surah.englishName,
              type: surah.revelationType,
              verse: surah.ayahs.length,
              id: surah.number
            })}
            style={styles.alignContentCenter}>
              <Text style={styles.number}>{surah.number}</Text>
              <Text style={styles.enName}>{surah.englishName}</Text>
              <Text style={styles.arName}>{surah.name}</Text>
              <Text style={styles.type}>{surah.revelationType}</Text>
              <Text style={styles.verse}>Verse:{surah.ayahs.length}</Text>
          </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.alignCenter}> 
          {this.renderSurah(surahEnglish)}
        </View>
      </ScrollView>
    )
  }
}

/*************************************************/
                // About Screen
/*************************************************/

class NotificationsScreen extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
              <Image source={require('./images/mdabarik.jpg')} style={{ width: 220, height: 220, borderRadius: 220, borderWidth: 1, borderColor: 'grey', marginTop: 10}} />
              <Text style={styles.aboutHead}>ABOUT DEVELOPER</Text>
              <Text style={styles.aboutText}>
                As-Sala-Mu-Alaikum. My name is Md. A. Barik. I have a YouTube channel name "TechBarik" where I tech programming stuff. Also I have a YouTube channel name "BariSuv" where I am trying to spread islamic knowledge all over the world. 
              </Text>
          </View>
        </ScrollView>
    );
  }
}


/*************************************************/
                // Exit Screen
/*************************************************/
class Exit extends React.Component {
  componentDidMount() {
    BackHandler.exitApp();
  }

  render() {
    return (
      <Text>Exit event</Text>
    )
  }
}

/*************************************************/
               // Details Screen
/*************************************************/
class Details extends React.Component {

  surah = () => {
    const {surahNo} = this.props.route.params;
  }

  num = (n) => {
    if(n>99) {
      return "bigNum"
    } else {
      return "num"
    }
  }

  findAndRenderSurah = (surahEn, surahAr) => {
    const id = parseInt(this.props.route.params.id);
    let selectedSurahAyahs = surahEn[id-1].ayahs;
      // return surahEn[id-1].surah.ayahs.map(ayah => {
      return selectedSurahAyahs.map(ayah => {
        let verse = ayah.numberInSurah - 1;
        return (
          <View style={styles.detailsContainer}>
            <Text style={styles.num}><Text style={styles + "." + this.num(200) }>{ayah.numberInSurah<100? "0" + ayah.numberInSurah:ayah.numberInSurah}</Text></Text>
            { 
              ayah.sajda ? 
              <Image style={styles.sajda} source={require('./images/sajda.png')} /> :
              <Image style={styles.quran} source={require('./images/quran.png')} />
            }
            <Text style={styles.arabicDetails}>{surahAr[id-1].ayahs[verse].text}</Text>
            <Text style={styles.englishDetails}>{ayah.text}</Text>
          </View>
        )
      }) 

  }

  render() {
    return (
      <ScrollView>
        <View style={styles.alignCenter}>
          <Text style={styles.title}>Surah: {this.props.route.params.name}</Text>
          <Text style={styles.mecca}>Type: {this.props.route.params.type}</Text>
          <Text>Verse: {this.props.route.params.verse}</Text>
        </View>

        {this.findAndRenderSurah(surahEnglish, surahArabic)}

        
      </ScrollView>
    )
  }

}

const styles = {
    sajda: {
      width: 60,
      height: 60
    },
    quran: {
      width: 45,
      height: 45
    },
    mecca: {
      fontSize: 15
    },
    detailsContainer: {
      margin: 5,
      padding: 5,
      borderColor: 'blue',
      borderWidth: 1,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      backgroundColor: '#FFCF82'
    },
    arabicDetails: {
      fontSize: 25,
      lineSpacing: 20,
      color: '#000',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      backgroundColor: '#F9B382',
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 5,
      paddingBottom: 5
    },
    title: {
      fontSize: 21,
      color: 'red',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: 'center'
    },
    englishDetails: {
      fontSize: 15,
      color: 'red',
      padding: 10,
      textAlign: 'center'
    },
    num: {
      borderColor: 'blue',
      borderWidth: 1,
      borderRadius: 50,
      width: 40,
      height: 40,
      paddingLeft: 8,
      paddingTop: 10,
    },
    bigNum: {
      paddingLeft: 6
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    aboutText: {
      fontSize: 18, 
      color: '#777777',
      flex: 1,
      justifyContent: "center",
      alignItems: "center", 
      margin: 10, 
      marginTop: 7, 
      textAlign: 'center', 
      marginBottom: 20
    },
    aboutHead: {
      fontSize: 20, 
      fontWeight: 'bold', 
      paddingTop: 10, 
      color: 'orangered'
    },
    alignCenter: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    alignContentCenter: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '95%', 
      height: 200, 
      borderRadius: 20, 
      borderWidth: 1, 
      borderColor: '#3282B7',
      marginTop: 10,
      backgroundColor: '#FFCF82'
    },
    number: {
      fontSize: 25,
      color: 'green',
      letterSpacing: 3
    },    
    arName: {
      fontSize: 27,
      color: '#007944',
      fontWeight: 'bold',
      letterSpacing: 3
    },
    enName: {
      fontSize: 27,
      color: 'red',
      letterSpacing: 3.5
    },
    type: {
      fontSize: 21,
      color: '#9D2503',
      letterSpacing: 2
    },
    verse: {
      fontSize: 17,
      color: '#CD0067',
      letterSpacing: 1.5
    }
}

const Stack = createStackNavigator();

RootScreen = ({route, navigation}) => {

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Holy Quran',
          headerStyle: {
            backgroundColor: '#065FD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <Icon name="bars" size={22} style={{ marginLeft: 20 }} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="Details" 
        component={Details} 
        options={{
          title: 'Surah ',
          headerStyle: {
            backgroundColor: '#005FD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
    </Stack.Navigator>
  );
}

function AboutScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Notifications">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
          title: 'About',
          headerStyle: {
            backgroundColor: '#005FD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <Icon name="bars" size={22} style={{ marginLeft: 20 }} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
/*
function detailsScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Details">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen 
        name="Details" 
        component={Details} 
        options={{
          title: 'Surah Al-Faatiha',
          headerStyle: {
            backgroundColor: '#005FD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <Text>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
} 
*/
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home" 
        drawerStyle={{
          backgroundColor: '#065FD4'
        }}
        drawerContentOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: '#ffffff'
        }}>
        <Drawer.Screen 
          name="Home" 
          component={RootScreen}
          options={{ drawerIcon: ({ tintColor }) => <Icon name="home" size={17} color="#fff" /> }}
        />
        <Drawer.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ drawerIcon: ({ tintColor }) => <Icon name="user" size={17} color="#fff" /> }}
        />
        <Drawer.Screen 
          name="Exit" 
          component={Exit}
          options={{drawerIcon: ({ tintColor }) => <Icon name="power-off" size={17} color="#fff" />}}
        /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

/*

<View style={styles.detailsContainer}>
          <Text style={styles.num}><Text style={styles + "." + this.num(200) }>286    </Text></Text>
          <Image style={styles.sajda} source={require('./images/sajda.png')} />
          <Text style={styles.arabicDetails}>صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ   رَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ   </Text>
          <Text style={styles.englishDetails}>The way of those upon whom Thou hast bestowed Thy blessings, not of those who have been condemned [by Thee], nor of those who go astray!</Text>
        </View>
         <View style={styles.detailsContainer}>
          <Text style={styles.num}><Text style={styles.innnerNum}>20    </Text></Text>
          <Image style={styles.quran} source={require('./images/quran.png')} />
          <Text style={styles.arabicDetails}>صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ     </Text>
          <Text style={styles.englishDetails}>The way of those upon whom Thou hast bestowed Thy blessings, not of those who have been condemned [by Thee], nor of those who go astray!</Text>
        </View>
         <View style={styles.detailsContainer}>
          <Text style={styles.num}><Text style={styles.innnerNum}>100    </Text></Text>
          <Text style={styles.arabicDetails}>صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ     </Text>
          <Text style={styles.englishDetails}>The way of those upon whom Thou hast bestowed Thy blessings, not of those who have been condemned [by Thee], nor of those who go astray!</Text>
        </View>
*/