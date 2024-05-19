import { notifications } from '@mantine/notifications';

export function showNotification(title: string, message: string) {
  notifications.show({
    title: title,
    message: message,
  });
}

export function showErrorNotification(message: string) {
  notifications.show({
    title: 'Error',
    message: message,
    color: 'red',
  });
}
