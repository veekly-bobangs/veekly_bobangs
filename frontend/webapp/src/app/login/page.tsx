'use client'
import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import {
 PAGE_PATHS,
} from '@/constants/endpoints';
import { showErrorNotification, showNotification } from '@/utils/notificationManager';
import { fetchPost } from '@/utils/browserHttpRequests';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    const res = await fetchPost(
      `/api/${API_ENDPOINTS.LOGIN}`,
      {
        email: email,
        password: password
      }
    );
    
    if (res.error) {
      showErrorNotification("Could not authenticate user: " + res.error);
      return;
    }

    showNotification("Success", "Logged in successfully");
    return router.push(PAGE_PATHS.HOME)
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome back
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor href={PAGE_PATHS.REGISTER}>
          Create account
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
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={login}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}