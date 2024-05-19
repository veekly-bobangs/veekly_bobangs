import React from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import {
  PasswordStrength,
} from '@/components/register';
import { PAGE_PATHS } from '@/constants/endpoints';
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { showErrorNotification, showNotification } from '@/utils';

export default function RegisterPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isStrongEnough, setIsStrongEnough] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const signUp = async () => {
    "use server";

    if (password !== confirmPassword) {
      showErrorNotification("Passwords do not match");
      return;
    }

    if (!isStrongEnough) {
      showErrorNotification("Password is not strong enough");
      return;
    }

    const origin = headers().get("origin");
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      showErrorNotification("Could not authenticate user");
      return redirect(PAGE_PATHS.LOGIN);
    }

    showNotification("Success", "Check email to continue sign in process");
    return redirect(PAGE_PATHS.LOGIN);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Create an account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor href={PAGE_PATHS.LOGIN}>
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="email@veekly.com"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordStrength
          value={password}
          setValue={setPassword}
          setIsStrongEnough={setIsStrongEnough}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Your password" required mt="md"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        />
        <Button fullWidth mt="xl" onClick={signUp}>
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}