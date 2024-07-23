import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {scrollToPage} from '../store/slices/pageChangeSlice';

const SurahCard = ({surah,navigation}) => {
  
  const dispatch = useDispatch();
  const handlePress = startPage => {
    dispatch(scrollToPage({startPage: startPage - 1}));
    navigation.closeDrawer()
  };
  return (
    <TouchableOpacity
      style={styles.boxContainer}
      onPress={() => handlePress(surah.startPage)}>
      <View style={styles.surahContainer}>
        <Text style={styles.surahTitle}>{surah.surahNo}</Text>
      </View>
      <View>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          {surah.titleEng}
        </Text>
        <Text style={{color: 'black', fontSize: 14}}>
          No. {surah.surahNo} _ Verse {surah.verses} _ {surah.type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SurahCard;

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  surahContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  surahTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#F1EDE5',
    padding: 5,
    borderRadius: 15,
  },
});
