'use client'

import React from 'react';
import {
  IconBurger,
} from '@tabler/icons-react';
import {
  AppShell,
  Burger,
  Container,
  Group,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar, HeaderRight } from '@/layout';

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
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <IconBurger size={'56px'} stroke={'2px'}/>
          <Text size="xl">
            Veekly Bobangs
          </Text>
          <HeaderRight />
        </Group>
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
