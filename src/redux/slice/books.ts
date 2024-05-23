import {createSlice, PayloadAction} from '@reduxjs/toolkit'


import {InterfaceBook} from "../../interface/interface-book.ts";
interface IBooks {
    books: InterfaceBook[]
}
const getBooks:InterfaceBook[] =JSON.parse(localStorage.getItem('books') || '[]')
const initialState: IBooks = {
    books: getBooks,
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state,action:PayloadAction<InterfaceBook>) => {
            state.books =[...state.books,action.payload] // Создаем новый массив
           return  localStorage.setItem('books', JSON.stringify(state.books));
        },
        deletedBook:(state, action:PayloadAction<number>) => {
            state.books = state.books.filter(book => book.id !== action.payload);
            localStorage.setItem('books', JSON.stringify(state.books));
        },
        editingBook: (state, action:PayloadAction<InterfaceBook>) => {
            state.books = state.books.map(book => book.id === action.payload.id ? action.payload : book);
            localStorage.setItem('books', JSON.stringify(state.books));
        },
        filterByAuthor:(state,action:PayloadAction<string>)=>{
            if (action.payload){
             state.books =  getBooks.filter(book => book.author.includes(String(action.payload)));
            }
            else {
            state.books = JSON.parse(localStorage.getItem('books') || '[]')
            }
        }

    },
})

export const { addBook,editingBook,deletedBook,filterByAuthor } = booksSlice.actions

export default booksSlice.reducer