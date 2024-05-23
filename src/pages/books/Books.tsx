

import Layout from "../../layout.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/Hooks.tsx";
import { useEffect} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import ButtonDelete from "./ButtonDelete.tsx";
import SelectFilterByAuthor from "./SelectFilterByAuthor.tsx";
import {deletedBook} from "../../redux/slice/books.ts";
import AddButton from "../../components/AddButton.tsx";
import EditingButton from "../../components/EditingButton.tsx";

export default function Books() {
    const {books} = useAppSelector(state => state.books)
    const {authors} = useAppSelector(state => state.authors)

    useEffect(() => {

        // setLocalBooks(getBooks)
    }, [books]);
    const getAuthorNamesByIds = (authorIds: string[]): string[] => {
        return authorIds.map(id => {
            const author = authors.find(author => author.id === Number(id));
            return author ? author.fullName : 'Автор не найден';
        });
    };
const dispatch = useAppDispatch();
    return (
        <div>
            <Layout>
                <div className={'flex items-center justify-between w-full mb-2'}>
                    <div className={'w-full'}>
            <SelectFilterByAuthor/>
                    </div>
                    <div  className={'w-full'}>
                <AddButton url={'/book/add'} label={'Добавить книгу'}/>
                    </div>
                </div>

            {books.length ? (
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Название</TableColumn>
                        <TableColumn>Автор</TableColumn>
                        <TableColumn>Год выпуска</TableColumn>
                        <TableColumn>Действия</TableColumn>
                    </TableHeader>
                    <TableBody  >
                            {books.map((book,index) => (
                        <TableRow  key={index}>
                                    <TableCell>{book.id}</TableCell>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{getAuthorNamesByIds(book.author).join(', ')}</TableCell>
                                    <TableCell>{book.yearRelease}</TableCell>
                                    <TableCell className={'flex gap-2 items-center'}>
                                        <ButtonDelete dispatchFn={(id) =>dispatch(deletedBook(id))} id={book.id}/>
                                    <EditingButton url={`/book/editing/${book.id}`}/>
                                    </TableCell>
                        </TableRow>
                            ))}
                    </TableBody>
                </Table>
            ) : (
                <p>Книги еще не добавлены :(</p>
            )}
            </Layout>
        </div>

    );
}