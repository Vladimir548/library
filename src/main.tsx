import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


import {NextUIProvider} from "@nextui-org/react";
import Books from "./pages/books/Books.tsx";
import BooksAdd from "./pages/books/BooksAdd.tsx";
import AuthorAdd from "./pages/authors/AuthorAdd.tsx";
import Authors from "./pages/authors/Authors.tsx";
import BookEditing from "./pages/books/BookEditing.tsx";
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'
import AuthorEditing from "./pages/authors/AuthorEditing.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },{
        path: "/books",
        element: <Books/>,
    },
    {
        path: "/book/add",
        element: <BooksAdd/>,
    }, {
        path: "/book/editing/:id",
        element: <BookEditing/>,
    },
    {
        path: "/authors",
        element: <Authors/>,
    },{
        path: "/author/add",
        element: <AuthorAdd/>,
    },{
        path: "/author/editing/:id",
        element: <AuthorEditing/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <NextUIProvider>
    <Provider store={store}>
            <main className="dark text-foreground bg-background h-screen">
                <RouterProvider router={router}/>
            </main>

    </Provider>
        </NextUIProvider>
  </React.StrictMode>,
)
