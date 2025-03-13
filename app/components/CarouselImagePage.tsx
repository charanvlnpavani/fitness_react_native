import React, { useRef, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ViewToken,
} from "react-native";

interface Media {
  id: string;
  url: string;
  type: string;
}

interface CarouselPageProps {
  data: Media[];
}

const { width: screenWidth } = Dimensions.get("window");

function CarouselImagePage({ data }: CarouselPageProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const flatListRef = useRef<FlatList>(null);

  const handleLoadStart = (id: string) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleLoadEnd = (id: string) => {
    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveSlide(viewableItems[0].index || 0);
      }
    },
    []
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const renderItem = ({ item }: { item: Media }) => {
    return (
      <View style={styles.slideContainer}>
        <Image
          source={{ uri: item.url }}
          style={styles.media}
          resizeMode="cover"
          onLoadStart={() => handleLoadStart(item.id)}
          onLoadEnd={() => handleLoadEnd(item.id)}
          onError={() => handleLoadEnd(item.id)}
        />
        {loading[item.id] && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        )}
      </View>
    );
  };

  // Filter out non-image media
  const imageData = data.filter((item) => item.type === "image");

  if (!imageData || imageData.length === 0) {
    return null;
  }

  const renderDot = (index: number) => (
    <View
      key={index}
      style={[
        styles.paginationDot,
        index === activeSlide
          ? styles.paginationDot
          : styles.paginationInactiveDot,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={imageData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        bounces={false}
        keyExtractor={(item) => item.id}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        contentContainerStyle={styles.flatListContent}
      />
      {imageData.length > 1 && (
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDotsContainer}>
            {imageData.map((_, index) => renderDot(index))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 300,
    backgroundColor: "#fff",
    position: "relative",
  },
  flatListContent: {
    flexGrow: 0,
  },
  slideContainer: {
    width: screenWidth,
    height: 300,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: screenWidth,
    height: "100%",
  },
  loader: {
    position: "absolute",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  paginationDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  paginationInactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default CarouselImagePage;
