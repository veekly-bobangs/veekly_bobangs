'use client'
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
import {
  PAGE_PATHS,
} from '@/constants/endpoints';

export default function RegisterPage() {
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
        <TextInput label="Email" placeholder="email@veekly.com" required />
        <PasswordStrength />
        <PasswordInput label="Confirm Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}