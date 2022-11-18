import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import axios from "axios";
export default function Contact() {
  const formId = "hkFtGTOR";
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

  const submitForm = async event => {
    event.preventDefault();
    setSubmitting(true);
    if (fullname === "" || email === "" || tel === "" || message === "") {
      setAlert({
        class: "bg-green-500",
        text: "please fill out all fields"
      });
    } else {
      await postSubmission();
      setSubmitting(false);
    }
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

  const updateFormControl = event => {
    const { id, value } = event.target;
    const key = id;
    const updatedFormState = { ...formState };
    updatedFormState[key] = value;
    setFormState(updatedFormState);
  };

  return (
    <>
      {alert && (
        <div className={`my-4 text-white w-full p-4 ${alert.class}`}>
          {alert.text}
        </div>
      )}
      <form
        //   action="https://submit-form.com/hkFtGTOR"
        onSubmit={submitForm}
        id="contactForm"
        className="col s12 xl7 pull-xl4 defaultCursor_ nopad"
        method="post"
        noValidate=""
      >
        {" "}
        <div className="row">
          <div className="input-field col s12 m6">
            <p>Full Name</p>
            <input
              required
              name="fullname"
              id="fullname"
              type="text"
              placeHolder="full name"
              className="validate"
              onChange={updateFormControl}
              value={formState?.fullname}
            />
          </div>
          <div className="input-field col s12 m6">
            <p>Email</p>
            <input
              name="email"
              id="email"
              type="email"
              placeHolder="email"
              className="validate"
              required
              onChange={updateFormControl}
              value={formState?.email}
            />
          </div>
          <div className="input-field col s12 m6">
            <p>Phone no</p>
            <input
              name="tel"
              id="tel"
              type="text"
              placeHolder="phone"
              className="validate"
              required
              onChange={updateFormControl}
              value={formState?.tel}
            />
          </div>
          <div className="input-field col s12 m6">
            <p>Message</p>
            <textarea
              id="message"
              name="message"
              placeHolder="message"
              rows="5"
              cols="33"
              required
              onChange={updateFormControl}
              value={formState?.message}
            />
          </div>
        </div>
        <br />
        <div className="col s12 l4 submit-btn-col">
          <button
            type="submit"
            className="btn submit-btn p"
            value="Submit now"
            data-reset="Submit now"
            data-loading="Please wait"
            data-success="Thank you"
            data-error="Error"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
