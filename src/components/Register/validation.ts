import { object, string } from "yup";

const validationSchema = object().shape({
  name: string().required("name is required"),
  email: string().email().required(),
  password: string().required("password is required"),
});

export default validationSchema;
