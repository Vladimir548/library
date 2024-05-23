import {useEffect} from "react";


import Layout from "../../layout.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/Hooks.tsx";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import ButtonDelete from "../books/ButtonDelete.tsx";

import {deletedAuthor} from "../../redux/slice/author.ts";
import AddButton from "../../components/AddButton.tsx";
import EditingButton from "../../components/EditingButton.tsx";

export default function Authors() {
    const {authors} = useAppSelector(state => state.authors)
    const {books} = useAppSelector(state => state.books)
    useEffect(() => {
    },[authors])
    const getTotalBooks = (authorId: number): number => {
    return  books.filter(book => book.author.includes(String(authorId))).length;
    };
    const dispatch = useAppDispatch()
    return (
        <div>
            <Layout>
            <div>
                <div className={'mb-3'}>
               <AddButton url={'/author/add'} label={'Добавить автора'}/>
                </div>
                {authors.length ? (
                        <Table >
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>ФИО</TableColumn>
                                <TableColumn>Количество книг</TableColumn>
                                <TableColumn>События</TableColumn>
                            </TableHeader>
                            <TableBody  >
                                {authors.map((author,index) => (
                                    <TableRow key={index}>
                                        <TableCell>{author.id}</TableCell>
                                        <TableCell>{author.fullName}</TableCell>
                                        <TableCell>{getTotalBooks(author.id)}</TableCell>
                                        <TableCell  className={'flex gap-2 items-center'}><ButtonDelete dispatchFn={(id) => dispatch(deletedAuthor(id))} id={author.id}/>
                                        <EditingButton url={`/author/editing/${author.id}`}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                ) : (
                    <p>Авторы еще не добавлены :(</p>
                )}
            </div>
            </Layout>
        </div>
    );
}