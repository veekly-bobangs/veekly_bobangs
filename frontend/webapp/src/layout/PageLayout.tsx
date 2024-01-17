'use client'

import React from 'react';
import {
  AppShell,
  Burger,
  Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container fluid>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
