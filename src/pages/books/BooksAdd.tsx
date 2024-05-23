
import { useEffect} from "react";


import {Field, Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {Select, SelectItem} from "@nextui-org/react";
import {InterfaceBook} from "../../interface/interface-book.ts";
import Layout from "../../layout.tsx";

import {useAppDispatch, useAppSelector} from "../../redux/Hooks.tsx";
import {addBook} from "../../redux/slice/books.ts";

export default function BooksAdd() {
    const initialValues:InterfaceBook = {
        id:Date.now(),
        name:'',
        author:[],
        yearRelease:2024,
    }
    const {authors} = useAppSelector(state => state.authors)
    useEffect(() => {
    }, [authors]);
    const dispatch =useAppDispatch()
    return (
        <Layout>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Обязательное поле к заполнению'),
                        author: Yup.array().of(Yup.number()).required('Required').min(1, 'Выберите минимум одного автора'),
                        yearRelease: Yup.string().required('Обязательное поле к заполнению')
                    })}
                    onSubmit={(values:InterfaceBook, { setSubmitting,resetForm}:FormikHelpers<InterfaceBook>) => {
                        dispatch(addBook(values));
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({ isSubmitting,values,setFieldValue}) => {

                        return (
                            <Form  className={'flex justify-center flex-col gap-3'}>
                                <Field name="name" id={'name'}  type="text" placeholder="Введите название книги" />
                                <Select
                                    label="Выберите автора"
                                    className="max-w-xs text-black bg-black"
                                    variant={"flat"}
                                    selectionMode="multiple"
                                    selectedKeys={new Set(values.author)}
                                    onSelectionChange={(selected) => setFieldValue('author', Array.from(selected))}
                                    name={'author'}

                                >
                                    {authors.map((author) => (
                                        <SelectItem  className=" text-black"  value={author.fullName} key={author.id}>
                                            {author.fullName}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Field name="yearRelease" id={'yearRelease'} type="text" placeholder="Введите год выпуска" />
                                <button className={'max-w-full border border-green-500 duration-300 ease-linear rounded-lg p-3 hover:bg-green-600'} type="submit" disabled={isSubmitting}>Создать запись</button>
                            </Form>
                        )
                    }}
                </Formik>

            </div>
        </Layout>
    );
}