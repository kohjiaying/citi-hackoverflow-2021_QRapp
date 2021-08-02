import React, { Component } from "react"
import {
  ScrollView,
  Animated,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native"

const OFFSET = 40
const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
const ITEM_HEIGHT = 200

const cards = [
  { title: "Movie 1", posterUrl: require("../assets/images/tenent.jpg") },
  { title: "Movie 2", posterUrl: require("../assets/images/tenent.jpg") },
  { title: "Movie 3", posterUrl: require("../assets/images/tenent.jpg") },
  { title: "Movie 4", posterUrl: require("../assets/images/tenent.jpg") },
]

export default function EventBannerScroll() {
  const scrollX = React.useRef(new Animated.Value(0)).current

  return (
      <ScrollView
        horizontal={true}
        decelerationRate={"normal"}
        snapToInterval={ITEM_WIDTH}
        style={{ marginTop: 40, paddingHorizontal: 0 }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={12}
      >
        {cards.map((item, idx) => {
          const inputRange = [
            (idx - 1) * ITEM_WIDTH,
            idx * ITEM_WIDTH,
            (idx + 1) * ITEM_WIDTH,
          ]

          const translate = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          })

          return (
            <Animated.View
			  key = {item.title}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginLeft: idx === 0 ? OFFSET : undefined,
                marginRight: idx === cards.length - 1 ? OFFSET : undefined,
                opacity: opacity,
                transform: [{ scale: translate }],
              }}
            >
              <ImageBackground
                source={item.posterUrl}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 6}}
              />
            </Animated.View>
          )
        })}
      </ScrollView>
  )
}