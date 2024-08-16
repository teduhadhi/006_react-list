import { Formik } from 'formik'
import React, {useState} from 'react'
import PersonalInformation from './components/PersonalInformation';
import AccountInformation from './components/AccountInformation';
import AddressInformation from './components/AddressInformation';



function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInformation: {
      fullName: "",
      emailAddress: "",
      dateOfBirth: new Date(),
    },
    addressInformation: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
    accountInformation: {
      username: "",
      password: "",
    },
  });

  const handleNextFormStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const handlePreviousFormStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
  };

  const formStep = () => {

      if(currentStep == 1){
        return (
          <PersonalInformation
            onSubmit = {(values: { 
              fullName: string;
              emailAddress: string;
              dateOfBirth: Date }) => {
              setFormData({
                ...formData,
                personalInformation: values,
              });
              handleNextFormStep();
            }}
            initialValues = {formData.personalInformation}
          />
        );
      } else if (currentStep == 2) {
        return (
          <AddressInformation
            onSubmit = {(values: { 
              streetAddress: string;
              city: string;
              state: string;
              zipCode: string; }) => {
              setFormData({
                ...formData,
                addressInformation: values,
              });
              handleNextFormStep();
            }}
            initialValues = {formData.addressInformation}
            handlePreviousFormStep = {handlePreviousFormStep}
          />
        );
      } else if (currentStep == 3){
        return (
          <AccountInformation
            onSubmit = {(values: { 
              username: string; 
              password: string }) => {
              setFormData({
                ...formData,
                accountInformation: values,
              });
              handleSubmit(values);
            }}
            initialValues = {formData.accountInformation}
            handlePreviousFormStep = {handlePreviousFormStep}
          />
        );
      }

  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      {formStep()}
    </div>
  )
}

export default MultiStepForm