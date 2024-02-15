import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { MapProvider } from '@/contexts';
import { PageLayout } from '@/layout';

export const metadata = {
  title: 'Veekly Bobangs',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider>
          <MapProvider>
            <PageLayout>
              {children}
            </PageLayout>
          </MapProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
