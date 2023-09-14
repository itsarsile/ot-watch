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
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = form.onSubmit(async (values, _event) => {
    _event.preventDefault();
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        callbackUrl: "/",
      });

      if (!res?.error) {
        notifications.show({
          message: "Login Berhasil",
          icon: <Check />,
          color: "green",
        });
      }
    } catch (error) {
      notifications.show({
        message: "Error logging in",
        icon: <X />,
        color: "red",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  });
  return (
    <Center className="h-screen">
      <Paper className="p-5 w-96" withBorder>
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
                <Button
                  variant="default"
                  type="submit"
                  loading={loading ? true : false}
                >
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
