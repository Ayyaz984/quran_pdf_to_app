import {createSlice} from '@reduxjs/toolkit';

const pageChangeSlice = createSlice({
  name: 'PageChange',
  initialState: {
    pageNo: 0,
    listRef: null,
  },
  reducers: {
    changePage(state, action) {
      state.pageNo = action.payload.pageNo;
    },
    storeRef(state, action) {
      state.listRef = action.payload.listRef;
    },
    scrollToPage(state, action) {
      const {startPage} = action.payload;
      console.log('startPage:', startPage);
      state.listRef.current.scrollToIndex({index: startPage, animated: true});
    },
  },
});

export const {changePage, storeRef, scrollToPage} = pageChangeSlice.actions;
export default pageChangeSlice.reducer;
