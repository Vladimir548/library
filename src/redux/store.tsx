import { configureStore } from '@reduxjs/toolkit'
import {booksSlice} from "./slice/books.ts";
import {authorsSlice} from "./slice/author.ts";
// ...

export const store = configureStore({
    reducer: {
        books:booksSlice.reducer,
        authors:authorsSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch