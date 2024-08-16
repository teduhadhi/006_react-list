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
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  return (
    <div>
      <h1>Account Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AccountInformationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex flex-col">
            <label htmlFor="userName">Username</label>
            <Field name="userName" id="userName" />
            <ErrorMessage name="userName" component="div" className="text-red-500"/>
  
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="text-red-500"/>

            <button onClick={handlePreviousFormStep}>Back</button>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AccountInformation



