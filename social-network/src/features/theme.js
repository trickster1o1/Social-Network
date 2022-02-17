import { createSlice } from "@reduxjs/toolkit";
const userTheme = localStorage.getItem('user-theme');
let initialStateValue = 'light';
if(userTheme) {
    initialStateValue = userTheme;
}
const themeSlice = createSlice({
    name: 'theme',
    initialState: {value: initialStateValue},
    reducers: {
        changeTheme: (state, action) => {
            state.value = action.payload;
        },
        defaultTheme: (state) => {
            state.value = 'light';
            localStorage.removeItem('user-theme');
        }
    },
});

export const { changeTheme, defaultTheme } = themeSlice.actions;
export default themeSlice.reducer;