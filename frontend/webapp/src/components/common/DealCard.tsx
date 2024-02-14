import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Deal } from '@/types';
import { VouchersDisplay } from '@/components/common';

interface DealCardProps {
  deal: Deal;
}

const TAG_COLOURS = ["#6C22A6", "#6962AD", "#83C0C1", "#96E9C6"]

export default function DealCard({ deal }: DealCardProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const openNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={deal.title}>
        <Stack justify='center' gap='lg'>
          <Button
            color="blue"
            fullWidth mt="md"
            radius="md"
            onClick={() => openNewTab(deal.link)}
          >
            Buy now
          </Button>
          <Text mt="sm">
            {deal.info}
          </Text>
          <Text mt="sm" size="sm" c="dimmed">
            {deal.address}
          </Text>
          <Text mt="sm" size="sm" c="dimmed">
            {deal.opening_hours}
          </Text>
          <VouchersDisplay vouchers={deal.vouchers} />
        </Stack>
      </Modal>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={deal.image}
            height={160}
            alt="Deal image"
          />
        </Card.Section>

        <Stack justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{deal.title}</Text>
          <Group gap="xs">
            {deal.tags.map((tag, index) =>
              <Badge
                key={index}
                color={TAG_COLOURS[index%(TAG_COLOURS.length)]}
              >
                {tag}
              </Badge>
            )}
          </Group>
        </Stack>

        <Text size="sm" c="dimmed">
          {deal.info}
        </Text>

        <Button
          color="blue"
          fullWidth mt="md"
          radius="md"
          onClick={open}
        >
          Details
        </Button>
      </Card>
    </>
  );
}