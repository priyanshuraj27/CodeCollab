import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: true,
    fontSize: 14,
    language: "javascript",
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { toggleTheme, setDarkMode, setFontSize, setLanguage } = themeSlice.actions;
export default themeSlice.reducer;
