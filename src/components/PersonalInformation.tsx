import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface PersonalInformationProps {
  onSubmit: (values: { 
    fullName: string;
    emailAddress: string;
    dateOfBirth: Date }) => void;

  initialValues: {
    fullName: string;
    emailAddress: string;
    dateOfBirth: Date };
}

function PersonalInformation ( { onSubmit, initialValues }: PersonalInformationProps ) {

  const PersonalInformationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    emailAddress: Yup.string()
      .email('invalid email')
      .required('Required'),

    dateOfBirth: Yup.date()
      .default(() => new Date())
      .required('Required'),
  });

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="font-medium text-xl text-slate-700">Personal Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalInformationSchema}
        onSubmit={onSubmit}
      >
        {({isSubmitting}) => (
          <Form className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-sm text-slate-500 font-medium">Full Name</label>
            <Field name="fullName" id="fullName" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="fullName" component="div" className="text-red-500"/>
  
            <label htmlFor="emailAddress" className="text-sm text-slate-500 font-medium">Email Address</label>
            <Field name="emailAddress" type="emailAddress" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="emailAddress" component="div" className="text-red-500"/>

            <label htmlFor="dateOfBirth" className="text-sm text-slate-500 font-medium">Date of Birth</label>
            <Field name="dateOfBirth" type="date" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500"/>

            <button className="font-medium bg-slate-400 text-white p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md" type="submit" disabled={isSubmitting}>Next</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PersonalInformation



