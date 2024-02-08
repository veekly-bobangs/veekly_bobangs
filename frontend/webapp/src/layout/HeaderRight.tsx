import {
  IconBellRinging,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Group,
} from '@mantine/core';

export default function HeaderRight() {
  return (
    <Group justify="flex-end" style={{ flex: 1 }}>
      <ActionIcon
        variant="gradient"
        size="lg"
        aria-label="Gradient action icon"
        gradient={{ from: 'blue', to: 'teal', deg: 137 }}
        onClick={(event) => event.preventDefault()}
      >
        <IconBellRinging />
      </ActionIcon>
    </Group>
  );
}
