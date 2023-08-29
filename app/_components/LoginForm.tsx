"use client";

import {
  Button,
  Center,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
function LoginForm() {

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = form.onSubmit(async (values, _event) => {
    try {
      _event.preventDefault();
      await signIn("credentials", {
        username: values.username,
        password: values.password,
      });
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Center className="h-screen">
      <Paper className="p-5 w-96">
        <Stack>
          <Title order={4}>Selamat datang di OT-WATCH</Title>
          <Divider />
          <Stack>
            <form onSubmit={handleLogin}>
              <Stack>
                <TextInput
                  {...form.getInputProps("username")}
                  label="Username"
                  placeholder="Masukkan username..."
                  required
                />
                <PasswordInput
                  {...form.getInputProps("password")}
                  label="Password"
                  placeholder="Masukkan password..."
                  required
                />
                <Button variant="default" type="submit">
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Paper>
    </Center>
  );
}

export default LoginForm;