import React from 'react';
import {Dimensions, View, StyleSheet, Text} from 'react-native';
import Carousel, {CarouselRenderItem} from 'react-native-reanimated-carousel';

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  },
  // ----------- example -------------
  carouselExampleContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    height: Dimensions.get('screen').width * 1.35,
    width: Dimensions.get('screen').width * 0.74,
    marginLeft: Dimensions.get('screen').width * 0.13,
  },
  carouselExampleText: {
    textAlign: 'center',
    fontSize: 30,
  },
  // ----------- example -------------
  carouselPositionContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
});

// Example Carousel Component
function ExampleCarouselChild({data = 'Carousel Data'}) {
  return (
    <View style={styles.carouselExampleContainer}>
      <Text style={styles.carouselExampleText}>{data}</Text>
    </View>
  );
}

function PoplCarouselComponent({
  items = [...new Array(6).keys()],
  width = Dimensions.get('screen').width,
  height = Dimensions.get('screen').width * 1.35,
  parallaxScrollingOffset = 120,
  parallaxAdjacentItemScale = 0.8,
  renderItem = ({item}) => <ExampleCarouselChild data={item} />,
}: {
  items: any[];
  width?: number;
  height?: number;
  parallaxScrollingOffset?: number;
  parallaxAdjacentItemScale?: number;
  renderItem?: CarouselRenderItem<any>;
}) {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={false}
        data={items}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset,
          parallaxAdjacentItemScale,
          parallaxScrollingScale: 1,
        }}
        renderItem={renderItem}
      />
    </View>
  );
}

export default PoplCarouselComponent;
