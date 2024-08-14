import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Platform,
  Dimensions,
  TextInput,
} from 'react-native';
import PoplCarouselComponent from './src/PoplCarouselComponent';
import data from './src/data.json';

type PhoneType = 'iphone_m' | 'iphone_l' | 'iphone_sm';
type User = {
  id: string;
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phoneNumbers?: {
    type: string;
    number: string;
  }[];
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  socialMedia?: {[key: string]: string};
};

const carouselImageWidth = Dimensions.get('screen').width;
const carouselImageHeight = Dimensions.get('screen').width * 1.35;
let imageScale = 1;
let phoneType: PhoneType = 'iphone_m';
if (Platform.OS === 'ios' && Dimensions.get('screen').height > 900) {
  phoneType = 'iphone_l';
}
if (Platform.OS === 'ios' && Dimensions.get('screen').height < 700) {
  phoneType = 'iphone_sm';
}
if (phoneType === 'iphone_l') {
  imageScale = 1.05;
}
if (phoneType === 'iphone_sm') {
  imageScale = 0.84;
}
const carouselItemWidth = Dimensions.get('screen').width * 0.74 * imageScale;
const carouselHeight = Math.floor(Dimensions.get('screen').height * 0.6);

const styles = StyleSheet.create({
  appContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItem: {
    width: carouselItemWidth,
    height: carouselHeight,
    marginLeft: (Dimensions.get('screen').width - carouselItemWidth) / 2,
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F9F9F9',
  },
  searchField: {
    width: '78%',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  rowItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const userData = data;
  /****************************************************/
  /***************** Add Your Code Here ***************/
  /****************************************************/

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.appContainer}>
        <TextInput
          style={styles.searchField}
          placeholder="Card information to search"
          placeholderTextColor="#999999"
        />
        <PoplCarouselComponent
          items={userData}
          height={carouselImageHeight * imageScale}
          width={carouselImageWidth}
          parallaxScrollingOffset={phoneType === 'iphone_sm' ? 130 : 110}
          parallaxAdjacentItemScale={phoneType === 'iphone_sm' ? 0.9 : 0.8}
          // renderItem={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
