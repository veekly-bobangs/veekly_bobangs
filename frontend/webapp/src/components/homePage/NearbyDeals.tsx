'use client'
import React from 'react';
import { Grid } from '@mantine/core';
import { Deal, Voucher } from '@/utils/staticDealFetch'

interface NearbyDealsProps {
  deals: Deal[];
}

export default function NearbyDeals({ deals }: NearbyDealsProps) {
  return (
    <Grid>
      {deals.map((deal) => (
        <Grid.Col key={deal.id} span={4}>
          <p>{deal.id}</p>
          <p>{deal.title}</p>
          <p>{deal.info}</p>
        </Grid.Col>
      ))}
    </Grid>
  );
}
