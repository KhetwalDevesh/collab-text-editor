import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import validationSchema from "./validation";
import { TextField, Button, Box } from "@mui/material";
import { registerUser } from "@/app/api/auth";
import { onSubmitLogin } from "../Login";
import { useGlobalState } from "@/store";
import { useRouter } from "next/navigation";

const Register = () => {
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

  const onSubmit = async (data: any) => {
    console.log(data);
    const response = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    console.log("response", JSON.stringify(response, null, 2));
    if (response.status === 201) {
      onSubmitLogin({
        email: data.email,
        password: data.password,
      });
    }
    // console.log(data);
  };

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
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "320px" }}
        autoComplete="off"
      >
        {/* Name Input */}
        <TextField
          {...register("name")}
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message?.toString()}
        />

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
            Create Account
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Register;
