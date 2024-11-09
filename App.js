import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from "react-native-reanimated";
import { View, Button } from "react-native";
import { useEffect, useState } from "react";

export default function AnimatedStyleUpdateExample(props) {
  const width = useSharedValue(10);

  const config = {
    duration: 1000,
    easing: Easing.linear,
  };
  useEffect(() => {
    width.value = withRepeat(withTiming(350, config), 10000)
  }, [])

  const style = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const [visible, setStyleVisible] = useState(false)

  console.log('is visible', visible)
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Animated.View
        style={[
          { width: 1, height: 80, backgroundColor: "black", margin: 30 },
          visible ? style : undefined,
        ]}
      />
      <Button
        title="toggle"
        onPress={() => {
          console.log('toggle')
          setStyleVisible(v => !v)
        }}
      />
    </View>
  );
}
