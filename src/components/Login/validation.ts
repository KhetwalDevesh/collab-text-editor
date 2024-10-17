import { object, string } from "yup";

const validationSchema = object().shape({
  email: string().email().required(),
  password: string().required("password is required"),
});

export default validationSchema;
