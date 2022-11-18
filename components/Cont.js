import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Formik } from "formik";
import axios from "axios";

export default function Cont() {
  const formsParkUrl = "https://submit-form.com/hkFtGTOR";
  const initialFormState = {
    fullname: "",
    email: "",
    tel: "",
    message: ""
  };

  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState();
  const [recaptchaToken, setReCaptchaToken] = useState();

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);

    await postSubmission();
    setSubmitting(false);
  };

  const postSubmission = async () => {
    const payload = {
      ...formState
      //   "g-recaptcha-response": recaptchaToken,
    };

    try {
      const result = await axios.post(formsParkUrl, payload);
      console.log(result);

      setAlert({
        class: "bg-green-500",
        text: "Thanks, someone will be in touch shortly."
      });
      setFormState(initialFormState);
      //   recaptchaRef.current.reset();
    } catch (error) {
      console.log(error);
      setAlert({
        class: "bg-red-500",
        text: "Sorry, there was a problem. Please try again or contact support."
      });
    }
  };
  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            // action="https://submit-form.com/hkFtGTOR"
          >
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
