import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { images } from '../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, storeRef } from '../store/slices/pageChangeSlice';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { PinchGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/pinchGesture';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import ZoomImage from '../components/ZoomImage';
import ImageItem from '../components/ZoomImage';

const { width, height } = Dimensions.get('window');

const ImageView = () => {
  const vListRef = useRef();
  const dispatch = useDispatch();
  const scale = useSharedValue(1);

  const state = useSelector(state => state.pageChange);

  useEffect(() => {
    dispatch(storeRef({ listRef: vListRef }));
  }, []);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = withSpring(event.scale, { stiffness: 30 });
    },
    onEnd: () => {
      if (scale.value < 1) {
        scale.value = withSpring(1, { stiffness: 50 });
      } else {
        scale.value = withSpring(scale.value, { stiffness: 50 });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ImageItem imageUri={item} />
    </View>
  );

  const getItemLayout = (data, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  });

  const handleViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length === 1) {
      dispatch(
        changePage({
          pageNo: viewableItems[0].index,
          imageViewRef: vListRef.current,
        }),
      );
    }
  };

  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <VirtualizedList
        ref={vListRef}
        data={images}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        onScrollBeginDrag={() => console.log('asdfsa')}
        onScrollEndDrag={() => console.log('end')}
        keyExtractor={(item, index) => index}
        getItem={(data, index) => data[index]}
        getItemCount={data => data.length}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        onViewableItemsChanged={handleViewableItemsChanged}
      />
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    objectFit: 'fill',
  },
  image: {
    width: width,
    height: height,
  },
});
