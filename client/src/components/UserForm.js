import React, {useState} from "react";
import axios from "axios";
import * as yup from "yup";
import { withFormik, Form, Field } from "formik";

const UserForm = () => {

    const [user, setUser] = useState([])

  return (
    <div>
      <Form>
        <Field type="text" name="name" placeholder="name" />
        <Field type="text" name="password" placeholder="password" />
        <button>Submit</button>
      </Form>
    </div>
  );
};
const FormikUserForm = withFormik({
 //maps props to the values you will be returned
  mapPropsToValues({ name, password }) {
    return {
      name: name || "",
      password: password || ""
    };
  },
  //handles the sumbission of values
  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res.data); // Data was created successfully and logs to console
      })
      .catch(err => {
        console.log(err); // There was an error creating the data and logs to console
      });
  }
})(UserForm);

export default FormikUserForm;
