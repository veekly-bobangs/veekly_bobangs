import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import { Deal } from '@/utils/staticDealFetch'

interface DealCardProps {
  deal: Deal;
}

const TAG_COLOURS = ["#6C22A6", "#6962AD", "#83C0C1", "#96E9C6"]

export default function DealCard({ deal }: DealCardProps) {
  const openNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
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
        {deal.tags.map((tag, index) => <Badge color={TAG_COLOURS[index%(TAG_COLOURS.length)]}>{tag}</Badge>)}
      </Group>
    </Stack>

    <Text size="sm" c="dimmed">
      {deal.info}
    </Text>

    <Button
      color="blue"
      fullWidth mt="md"
      radius="md"
      onClick={() => openNewTab(deal.link)}
    >
      Buy now
    </Button>
  </Card>
  );
}