import {InterfaceAuthor} from "../../interface/interface-author.tsx";
import Layout from "../../layout.tsx";
import {Field, Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {useAppDispatch} from "../../redux/Hooks.tsx";
import {addAuthor} from "../../redux/slice/author.ts";

export default function AuthorAdd() {
    const initialValues:InterfaceAuthor = {
        id:Date.now(),
        fullName:'',
    }
    const dispatch = useAppDispatch()
    return (
        <div>
            <Layout>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        fullName: Yup.string().required('Это обязательно к заполнению'),

                    })}
                    onSubmit={(values:InterfaceAuthor, { setSubmitting,resetForm}:FormikHelpers<InterfaceAuthor>) => {
                        dispatch(addAuthor(values));
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form  className={'flex justify-center flex-col gap-3'}>
                            <Field name="fullName" id={'fullName'} type="text" placeholder="Введите ФИО автора" />
                            <button  className={' border border-green-500 duration-300 ease-linear rounded-lg p-3 hover:bg-green-600'} type="submit" disabled={isSubmitting}>Создать запись</button>
                        </Form>
                    )}
                </Formik>
            </Layout>
        </div>
    );
}