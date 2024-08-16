import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface AddressInformationProps {
  onSubmit: (values: { 
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string; }) => void;

  initialValues: { 
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string; };

  handlePreviousFormStep: () => void;
}

function AddressInformation({onSubmit, initialValues, handlePreviousFormStep}: AddressInformationProps) {
  const AddressInformationSchema = Yup.object().shape({
    streetAddress: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    city: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    state: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    zipCode: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  return (
    <div>
      <h1>Address Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AddressInformationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex flex-col">
            <label htmlFor="streetAddress">Street Address</label>
            <Field name="streetAddress" id="streetAddress" />
            <ErrorMessage name="streetAddress" component="div" className="text-red-500"/>
  
            <label htmlFor="city">City</label>
            <Field name="city" type="text" />
            <ErrorMessage name="city" component="div" className="text-red-500"/>

            <label htmlFor="state">State</label>
            <Field name="state" type="text" />
            <ErrorMessage name="state" component="div" className="text-red-500"/>

            <label htmlFor="zipCode">Zip Code</label>
            <Field name="zipCode" type="text" />
            <ErrorMessage name="zipCode" component="div" className="text-red-500"/>

            <button onClick={handlePreviousFormStep}>Back</button>
            <button type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddressInformation



