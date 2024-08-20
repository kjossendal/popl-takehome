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
  Text,
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
  company?: {
    name?: string;
    department?: string;
    position?: string;
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
  const [searchResults, setSearchResults] =
    React.useState<typeof userData>(userData);
  const renderItem = ({item}: {item: User}) => {
    return (
      <View style={styles.carouselItem}>
        <View style={styles.rowItem}>
          <Text>
            Name: {item.name.first} {item.name.last}
          </Text>
        </View>
        {item.phoneNumbers?.map((phone, index) => (
          <View style={styles.rowItem} key={index}>
            <Text>
              {phone.type}: {phone.number}
            </Text>
          </View>
        ))}
        <View style={styles.rowItem}>
          <Text>Email: {item.email}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>Address:</Text>
          <View style={{marginLeft: 4}}>
            <Text>{item.address?.street}</Text>
            <Text>{item.address?.city}</Text>
            <Text>
              {item.address?.state} {item.address?.postalCode}
            </Text>
            <Text>{item.address?.country}</Text>
          </View>
        </View>
        {item.company && (
          <View style={styles.rowItem}>
            <Text>Company:</Text>
            <View style={{marginLeft: 4}}>
              <Text>{item.company.name}</Text>
              <Text>{item.company.department}</Text>
              <Text>{item.company.position}</Text>
            </View>
          </View>
        )}
        {item.socialMedia &&
          Object.entries(item.socialMedia).map(([key, value], index) => (
            <View style={styles.rowItem} key={index}>
              <Text>
                {key}: {value}
              </Text>
            </View>
          ))}
      </View>
    );
  };

  const handleSearch = (text: string) => {
    const r = data.filter(user => {
      const userNameAndAddress = `${user.name.first} ${user.name.last} ${user.address?.street} ${user.address?.city} ${user.address?.state} ${user.address?.postalCode} ${user.address?.country}`;
      if (userNameAndAddress.toLowerCase().includes(text.toLowerCase())) {
        return user;
      }
    });
    setSearchResults(r);
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.appContainer}>
        <TextInput
          style={styles.searchField}
          placeholder="Card information to search"
          placeholderTextColor="#999999"
          onChangeText={handleSearch}
        />
        <PoplCarouselComponent
          items={searchResults}
          height={carouselImageHeight * imageScale}
          width={carouselImageWidth}
          parallaxScrollingOffset={phoneType === 'iphone_sm' ? 130 : 110}
          parallaxAdjacentItemScale={phoneType === 'iphone_sm' ? 0.9 : 0.8}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
