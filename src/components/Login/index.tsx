import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { login, registerUser } from "@/app/api/auth";
import validationSchema from "./validation";
import { setGlobalState, useGlobalState } from "@/store";
import { useRouter } from "next/navigation";

export const onSubmitLogin = async (data: any) => {
  const response = await login({
    email: data.email,
    password: data.password,
  });
  console.log("response", JSON.stringify(response, null, 2));
  setGlobalState({
    authToken: response.data.token,
    userId: response.data.me.id,
    userName: response.data.me.name,
  });
  console.log(data);
};

const Login = () => {
  const { userId } = useGlobalState();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(); // Clear form values when the component mounts
  }, []);

  useEffect(() => {
    if (userId !== null) {
      router.push("/");
    }
  }, [userId]);

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        style={{ width: "320px" }}
        autoComplete="off"
      >
        {/* Email Input */}
        <TextField
          {...register("email")}
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
          autoComplete="off"
          id="input-email-123"
        />

        {/* Password Input */}
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message?.toString()}
        />

        {/* Custom MUI Submit Button */}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
