import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import pdfPages from '../constants/PdfPages.json';
import SurahCard from '../components/SurahCard';
import {useSelector} from 'react-redux';

const DrawerContent = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState(pdfPages);

  const handleSearch = query => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPages(pdfPages);
    } else {
      const filtered = pdfPages
        .map(juz => {
          const filteredSurahs = juz.surahs.filter(surah =>
            surah.titleEng.toLowerCase().includes(query.toLowerCase()),
          );
          return {...juz, surahs: filteredSurahs};
        })
        .filter(juz => juz.surahs.length > 0);
      setFilteredPages(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search in Surah(s) names"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredPages}
        renderItem={({item, index}) => (
          <>
            <View style={styles.drawerItem}>
              <Text style={{color: 'black'}}>{item.title}</Text>
            </View>
            {item?.surahs?.map((surah, indx) => (
              <TouchableOpacity activeOpacity={0.5} key={indx + 2 * 10}>
                <SurahCard surah={surah} />
              </TouchableOpacity>
            ))}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#F6F6F2',
    // paddingHorizontal: 10,
  },
  searchInput: {
    color: 'black',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  drawerItem: {
    color: 'black',
    fontSize: 18,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#F1EDE5',
  },
});

export default DrawerContent;
