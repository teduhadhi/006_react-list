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
      .min(3, 'Too Short!')
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
    <div>
      <h1>Personal Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalInformationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex flex-col">
            <label htmlFor="fullName">Full Name</label>
            <Field name="fullName" id="fullName" />
            <ErrorMessage name="fullName" component="div" className="text-red-500"/>
  
            <label htmlFor="emailAddress">Email Address</label>
            <Field name="emailAddress" type="emailAddress" />
            <ErrorMessage name="emailAddress" component="div" className="text-red-500"/>

            <label htmlFor="dateOfBirth">Date of Birth</label>
            <Field name="dateOfBirth" type="date" />
            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500"/>

            <button type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PersonalInformation



