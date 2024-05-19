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
import { showErrorNotification } from '@/utils/notificationManager';
import { redirect } from 'next/navigation';
import { createClient } from "@/utils/supabase/server";

export default function LoginPage() {
  const signIn = async (formData: FormData) => {
    "use server";
  
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      showErrorNotification("Could not authenticate user");
      return redirect(PAGE_PATHS.LOGIN);
    }
  
    return redirect(PAGE_PATHS.HOME);
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
        <TextInput label="Email" placeholder="email@veekly.com" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}