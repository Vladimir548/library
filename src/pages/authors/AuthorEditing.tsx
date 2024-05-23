
import {useParams} from "react-router-dom";



import {InterfaceAuthor} from "../../interface/interface-author.tsx";
import {Field, Form, Formik, FormikHelpers} from "formik";
import Layout from "../../layout.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/Hooks.tsx";

import * as Yup from "yup";
import {editingAuthor} from "../../redux/slice/author.ts";
import {useEffect, useState} from "react";


export default  function AuthorEditing() {

    const {authors} = useAppSelector(state => state.authors)
    const {id} = useParams<{id:string}>();
    const [authorId,setAuthorId] = useState<InterfaceAuthor>();
    useEffect(() => {

        setAuthorId(authors.find((author:InterfaceAuthor) => author.id === Number(id)));
    }, [id]);


    const dispatch = useAppDispatch();
    if (!authorId) {
        return (
            <div>
                <Layout>
                    <p>Загрузка...</p>
                </Layout>
            </div>
        );
    }
    const initialValues:InterfaceAuthor = {
        id:authorId.id,
        fullName:authorId.fullName,
    }
    return (
        <div>
            <Layout>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        fullName: Yup.string().required('Это поле является обязательным к заполнению'),

                    })}
                    onSubmit={(values:InterfaceAuthor, { setSubmitting}:FormikHelpers<InterfaceAuthor>) => {
                        dispatch(editingAuthor(values));
                        setSubmitting(false);

                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className={'flex flex-col gap-3'}>
                            <Field name="fullName" id={'fullName'} type="text" placeholder="Введите ФИО" />

                            <button className={' border border-green-500 duration-300 ease-linear rounded-lg p-3 hover:bg-green-600'} type="submit" disabled={isSubmitting}>Редактировать запись</button>
                        </Form>
                    )}
                </Formik>
            </Layout>
        </div>
    );
}