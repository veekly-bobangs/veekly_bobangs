"use client";

import React from 'react';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';
import { API_ENDPOINTS, PAGE_PATHS } from '@/constants';
import { fetchPost } from '@/utils/browserHttpRequests';
import { showErrorNotification, showNotification } from '@/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  
  const sendForgetPasswordRequest = async () => {
    const res = await fetchPost(
      `${API_ENDPOINTS.FORGOT_PASSWORD}`,
      {
        email: email,
      }
    );
    if (res.error) {
      showErrorNotification("Could not send reset password email: " + res.error);
      return;
    }
    showNotification("Reset link sent", "Check email to continue reset password process");
  }
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="email@veekly.com"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control} href={PAGE_PATHS.LOGIN}>
            <Center inline>
              <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button
            className={classes.control}
            onClick={sendForgetPasswordRequest}
          >
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
