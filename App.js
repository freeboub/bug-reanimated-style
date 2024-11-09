import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from "react-native-reanimated";
import { View, Button } from "react-native";
import { useEffect, useState } from "react";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://cd7ffc0d9a5ed80fd3c471db2c45db66@o4508268351062016.ingest.de.sentry.io/4508268351389776',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

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
