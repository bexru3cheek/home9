import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userSchema } from "../schema/login";
import { toast } from "react-toastify";

const LoginP = () => {
  const navigate = useNavigate();
  // const submit = async (e) => {
  // e.preventDefault();
  // let form = e.currentTarget;
  // let user = {
  //   email: form.email.value,
  //   password: form.password.value,
  //   // url: form.url.value,
  //   // age: form.age.value,
  // };
  // let isValid = await userSchema.isValid(user);

  // if (isValid) {

  // } else {

  // }
  // let validatedUser = userSchema.cast(user);
  // console.log(validatedUser);
  // userSchema
  //   .validate(user)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log("Error", err.errors);
  //   });
  // };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      let isValid = await userSchema.validate(values);
      if (isValid) {
        try {
          await axios.post("https://reqres.in/api/login", values);
          formik.resetForm();
          navigate("/categories");
        } catch (err) {
          toast.error(err.response.data.error);
        }
      }
    },
  });
  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center">
      <form onSubmit={formik.handleSubmit}>
        <input
          name="email"
          className="form-control mb-3"
          type="text"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched?.email && formik.errors?.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null}
        <input
          name="password"
          className="form-control mb-3"
          type="Password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched?.password && formik.errors?.password ? (
          <p className="text-danger">{formik.errors.password}</p>
        ) : null}
        {/* <ErrorMessage name="password" /> */}
        {/* <input
          name="url"
          className="form-control mb-3"
          type="text"
          placeholder="Url"
        />
        <input
          name="age"
          className="form-control mb-3"
          type="text"
          placeholder="Age"
        /> */}
        <input className="form-control" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default LoginP;
