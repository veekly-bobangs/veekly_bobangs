'use client'
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
} from '@mantine/carousel';
import {
  rem,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { Deal } from '@/types';
import { DealCard } from '@/components/common';
import classes from './AllDeals.module.css';

interface AllDealsProps {
  deals: Deal[];
}

export default function AllDeals({ deals }: AllDealsProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const autoplay = React.useRef(Autoplay({ delay: 3500 }));

  const iconWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    width: rem(24),
    height: rem(24),
    borderRadius: '50%',
  };

  return (
    <Stack>
      <Text>All Deals</Text>
      <Carousel
      classNames={classes}
        nextControlIcon={
          <div style={iconWrapperStyle}>
            <IconArrowRight style={{ width: rem(16), height: rem(16) }} />
          </div>
        }
        previousControlIcon={
          <div style={iconWrapperStyle}>
            <IconArrowLeft style={{ width: rem(16), height: rem(16) }} />
          </div>
        }
        slideSize={{ base: '100%', sm: '50%' }}
        slideGap={{ base: 'xl', sm: 2 }}
        align="start"
        slidesToScroll={mobile ? 1 : 2}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {deals.map((deal, index) => (
          <Carousel.Slide key={index}>
            <DealCard key={index} deal={deal} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
}
