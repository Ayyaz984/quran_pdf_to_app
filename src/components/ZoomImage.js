import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedGestureHandler,
    withTiming,
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageItem = ({ imageUri }) => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0)
    const focalY = useSharedValue(0)

    const pinchHandler = useAnimatedGestureHandler({
        onActive: event => {
            scale.value = withSpring(event.scale, { stiffness: 30 });
            focalX.value = event.focalX
            focalY.value = event.focalY
        },
        onEnd: () => {
            if (scale.value < 1) {
                scale.value = withTiming(1, { stiffness: 50 });
            } else {
                scale.value = withTiming(scale.value, { stiffness: 50 });
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            //   transform: [{ scale: scale.value }],
            transform: [
                { translateX: -focalX.value },
                { translateY: -focalY.value },

                { scale: scale.value },
                { translateY: focalY.value },
                { translateX: focalX.value },
            ]
        };
    });

    return (
        <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={styles.container}>
                <Animated.Image
                    source={imageUri}
                    style={[animatedStyle, styles.image]}
                    resizeMode="contain"
                />
            </Animated.View>
        </PinchGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
    },
    image: {
        width: screenWidth,
        height: screenHeight,
        objectFit: "fill"
    },
});

export default ImageItem;
