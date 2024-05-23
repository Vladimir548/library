import {useEffect, useState} from "react";
import {InterfaceBook} from "../../interface/interface-book.ts";
import {useParams} from "react-router-dom";
import {Select, SelectItem} from "@nextui-org/react";
import {Field, Form, Formik, FormikHelpers} from "formik";
import Layout from "../../layout.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/Hooks.tsx";
import {editingBook} from "../../redux/slice/books.ts";

export default  function BookEditing() {
    const dispatch =useAppDispatch()
    const {books} = useAppSelector(state => state.books)
    const {id} = useParams<{id:string}>();
        const [bookId,setBookId] = useState<InterfaceBook>();
    useEffect(() => {
        setBookId(books.find((book:InterfaceBook) => book.id === Number(id)));
    }, [id]);
    const {authors} = useAppSelector(state => state.authors)

    if (!bookId) {
        return (
            <div>
                <Layout>
                    <p>Загрузка...</p>
                </Layout>
            </div>
        );
    }
     const  initialValues:InterfaceBook  =  {
        id:bookId?.id,
        name:bookId?.name,
        author:bookId?.author,
        yearRelease:bookId?.yearRelease,
    }
    return (
        <div>
            <Layout>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values:InterfaceBook, { setSubmitting}:FormikHelpers<InterfaceBook>) => {
                        dispatch(editingBook(values));
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting,values,setFieldValue}) => {

                        return (
                            <Form  className={'flex flex-col gap-3'}>
                                <Field name="name" id={'name'}  type="text" placeholder="Enter book title" />
                                <Select
                                    label="Выберите автора"
                                    className="max-w-xs text-black bg-black"
                                    variant={"flat"}
                                    selectionMode="multiple"
                                    selectedKeys={new Set(values.author)}
                                    onSelectionChange={(selected) => setFieldValue('author', Array.from(selected))}
                                    defaultSelectedKeys={values.author}
                                    name={'author'}

                                >
                                    {authors.map((author) => (
                                        <SelectItem  className=" text-black"  value={author.fullName} key={author.id}>
                                            {author.fullName}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Field name="yearRelease" id={'yearRelease'} type="number" placeholder="Введите год выпуска" />
                                <button className={' border border-green-500 duration-300 ease-linear rounded-lg p-3 hover:bg-green-600'} type="submit" disabled={isSubmitting}>Редактировать запись</button>
                            </Form>
                        )
                    }}
                </Formik>
            </Layout>
        </div>
    );
}