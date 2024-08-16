import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface AccountInformationProps {
  onSubmit: (values: { 
    username: string; 
    password: string }) => void;

  initialValues: { 
    username: string; 
    password: string };

  handlePreviousFormStep: () => void;
}

function AccountInformation({onSubmit, initialValues, handlePreviousFormStep}: AccountInformationProps) {

  const AccountInformationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    password: Yup.string()
      .min(8, 'Your password must be at least 8 characters')
      .max(50, 'Too Long!')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Required'),
  });

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="font-medium text-xl text-slate-700">Account Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AccountInformationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-1">
            <label htmlFor="userName" className="text-sm text-slate-500 font-medium">Username</label>
            <Field name="userName" id="userName" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="userName" component="div" className="text-red-500"/>
  
            <label htmlFor="password" className="text-sm text-slate-500 font-medium">Password</label>
            <Field name="password" type="password" className="shadow-md rounded-md p-2 mb-3"  />
            <ErrorMessage name="password" component="div" className="text-red-500"/>

            <button className="box-border font-medium bg-white text-slate-400 p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-white hover:border-slate-200 border border-slate-400 transition hover:shadow-md" onClick={handlePreviousFormStep}>Back</button>
            <button className="font-medium bg-slate-400 text-white p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md"   type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AccountInformation



