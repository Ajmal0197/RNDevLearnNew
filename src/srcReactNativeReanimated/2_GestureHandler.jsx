import React, { memo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    withTiming,
    interpolate,
    useSharedValue,
} from 'react-native-reanimated';

const MIN_PLAYER_HEIGHT = 60;  // Minimum height of the player when collapsed
const MAX_PLAYER_HEIGHT = 500; // Maximum height of the player (expanded)

    const WithPlayer = (props) => {
        const translationY = useSharedValue(0); // Vertical translation state
        const isExpanded = useSharedValue(false); // To track expanded state

        useEffect(() => {
            translationY.value = withTiming(0, { duration: 0 });
        }, [translationY]);

        const panGesture = Gesture.Pan()
            .onUpdate((event) => {
                translationY.value = Math.max(
                    Math.min(event.translationY, 0),
                    -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT
                );
            })
            .onEnd((event) => {
                if (event.translationY < -MIN_PLAYER_HEIGHT / 2) {
                    isExpanded.value = true;
                    translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, { duration: 300 });
                } else {
                    isExpanded.value = false;
                    translationY.value = withTiming(0, { duration: 300 });
                }
            });

        const animatedContainerStyles = useAnimatedStyle(() => {
            const height = interpolate(
                translationY.value,
                [-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, 0],
                [MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT],
                'clamp'
            );
            return {
                height,
                borderTopLeftRadius: translationY.value < -2 ? 15 : 0,
                borderTopRightRadius: translationY.value < -2 ? 15 : 0,
            };
        });

        return (
            <View style={styles.container}>
                {/* Render wrapped component */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.playerContainer, animatedContainerStyles]}>
                        {/* This is where expanded or collapsed content can go */}
                    </Animated.View>
                </GestureDetector>
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    playerContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
});

export default memo(WithPlayer);
