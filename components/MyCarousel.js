import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const slideList = Array.from({ length: 30 }).map((_, i) => {
  return {
    id: i,
    image: `https://picsum.photos/1440/2842?random=${i}`,
    title: `This is the title! ${i + 1}`,
    subtitle: `This is the subtitle ${i + 1}!`,
  };
});
function Slide({ data }) {
  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: data.image }}
        style={{ width: windowWidth * 0.9, height: windowHeight * 0.9 }}
      ></Image>
      <Text style={{ fontSize: 24 }}>{data.title}</Text>
      <Text style={{ fontSize: 18 }}>{data.subtitle}</Text>
    </View>
  );
}

function MyCarousel() {

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(e => e.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  // Use the index
  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
      <FlatList
      data={slideList}
      style={{ flex: 1 }}
      renderItem={({ item }) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
  />
  );
}
export default MyCarousel;
