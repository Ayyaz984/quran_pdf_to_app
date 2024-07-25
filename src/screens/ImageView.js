import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { images } from '../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, storeRef } from '../store/slices/pageChangeSlice';

const { width, height } = Dimensions.get('window');

const ImageView = ({ navigation }) => {
  const vListRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state.pageChange);

  useEffect(() => {
    dispatch(storeRef({ listRef: vListRef }));
  }, []);


  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{ backgroundColor: "#F1EDE5", position: "absolute", zIndex: 1, marginLeft: 15, paddingHorizontal: 5 }} onPress={() => navigation.openDrawer()} activeOpacity={1}>
        <Image source={require('../assets/icons/menu.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
      </TouchableOpacity>
      {
        index % 2 == 0 ?
          <Image source={require('../assets/icons/right_arrow.png')} style={styles.arrow} />
          :
          <Image source={require('../assets/icons/left_arrow.png')} style={styles.arrow} />

      }
      <Image
        source={item}
        style={[styles.page]}
        resizeMode="contain"
      />
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
  arrow: {
    position: "absolute",
    zIndex: 1,
    top: -2,
    left: "50%",
    right: "50%",
    width: 30,
    height: 15
  }
});
