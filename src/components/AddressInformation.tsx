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
      .min(10, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    city: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    state: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    zipCode: Yup.string()
      .length(6, 'Invalid zipcode')
      .matches(/[0-9]/, 'Invalid zipcode')
      .required('Required'),
  });

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="font-medium text-xl text-slate-700">Address Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AddressInformationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-1">
            <label htmlFor="streetAddress" className="text-sm text-slate-500 font-medium">Street Address</label>
            <Field name="streetAddress" id="streetAddress" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="streetAddress" component="div" className="text-red-500"/>
  
            <label htmlFor="city" className="text-sm text-slate-500 font-medium">City</label>
            <Field name="city" type="text" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="city" component="div" className="text-red-500"/>

            <label htmlFor="state" className="text-sm text-slate-500 font-medium">State</label>
            <Field name="state" type="text" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="state" component="div" className="text-red-500"/>

            <label htmlFor="zipCode" className="text-sm text-slate-500 font-medium">Zip Code</label>
            <Field name="zipCode" type="text" className="shadow-md rounded-md p-2 mb-3" />
            <ErrorMessage name="zipCode" component="div" className="text-red-500 p-0 m-0"/>

            <button className="box-border font-medium bg-white text-slate-400 p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-white hover:border-slate-200 border border-slate-400 transition hover:shadow-md" onClick={handlePreviousFormStep}>Back</button>
            <button className="font-medium bg-slate-400 text-white p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md"  type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddressInformation



