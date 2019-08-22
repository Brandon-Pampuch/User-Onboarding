import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

const UserForm = ({ errors, touched, values, status }) => {
    //what is values for?  errors and touched are props passed in by formik through up as errors , touched same and if used.
  const [user, setUser] = useState([]);
  console.log("user:", user)
  
  useEffect(() => {
//use status to set state ////////////////
    if (status) {
        setUser([...user, status]);
      }
  }, [status]);


  return (
    <div>
      <Form>
        <Field component="input" type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="password" placeholder="password" />
        <button>Submit</button>
      </Form>
    </div>
  );
};
const FormikUserForm = withFormik({
    //cofiguration schema:
  //maps props to the values you will be returned
  mapPropsToValues({ name, password }) {
    return {
      name: name || "",
      password: password || ""
    };
  },
  //handles validations///////////////////////
  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required"),
    password: Yup.string().required("Password is required").min(16, "Password must be 16 characters or longer")
  }),
  //handles the sumbission of values////////////////
  handleSubmit(values, {setStatus}) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        console.log(res.data); // Data was created successfully and logs to console
      })
      .catch(err => {
        console.log(err); // There was an error creating the data and logs to console
      });
  }
})(UserForm);

export default FormikUserForm;
