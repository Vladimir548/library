import {createSlice, PayloadAction} from '@reduxjs/toolkit'


import {InterfaceAuthor} from "../../interface/interface-author.tsx";

interface IAuthors {
    authors: InterfaceAuthor[]
}
const getAuthors =JSON.parse(localStorage.getItem('authors') || '[]')
const initialState: IAuthors = {
    authors: getAuthors,
}

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        addAuthor: (state,action:PayloadAction<InterfaceAuthor>) => {
            state.authors.push(action.payload);
            localStorage.setItem('authors', JSON.stringify(state.authors));
        },
        deletedAuthor:(state, action:PayloadAction<number>) => {
            state.authors = state.authors.filter(author => author.id !== action.payload);
            localStorage.setItem('authors', JSON.stringify(state.authors));
        },
        editingAuthor: (state, action:PayloadAction<InterfaceAuthor>) => {
            state.authors = state.authors.map(author => author.id === action.payload.id ? action.payload : author);
            localStorage.setItem('authors', JSON.stringify(state.authors));
        },


    },
})

export const { addAuthor,editingAuthor,deletedAuthor } = authorsSlice.actions

export default authorsSlice.reducer