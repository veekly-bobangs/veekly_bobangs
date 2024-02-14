import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Paper, Text, Group, Stack, Title } from '@mantine/core';
import { IconCalendar, IconTag, IconCash, IconClock } from '@tabler/icons-react';
import {  Voucher } from '@/types';

interface VouchersDisplayProps {
  vouchers: Voucher[];
};

interface VoucherProps {
  voucher: Voucher;
};

function Voucher({ voucher }: VoucherProps ) {
  return (
    <Paper shadow="sm" p="md" withBorder radius="md">
      <Stack gap="md" align="center">
        <Group gap="xs">
          <IconCalendar />
          <Title order={4}>{voucher.date}</Title>
        </Group>
        <Group gap="xs">
          <IconTag />
          <Text>Discounted: {voucher.price_discounted}</Text>
        </Group>
        <Group gap="xs">
          <IconCash />
          <Text>Original: {voucher.price_original}</Text>
        </Group>
        <Group gap="xs">
          <IconTag />
          <Text>Savings: {voucher.product_savings}</Text>
        </Group>
        <Group gap="xs">
          <IconClock />
          <Text>{voucher.time}</Text>
        </Group>
      </Stack>
    </Paper>
  );
}

export default function VouchersDisplay({ vouchers }: VouchersDisplayProps) {
  return (
    <Carousel >
      {vouchers.map((voucher, index) => (
        <Carousel.Slide key={index}>
          <Voucher key={index} voucher={voucher} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
