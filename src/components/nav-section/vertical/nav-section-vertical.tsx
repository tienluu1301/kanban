import { memo } from 'react';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavProps, NavGroupProps } from '../types';

// ----------------------------------------------------------------------

function NavSectionVertical({ data, slotProps, ...other }: NavProps) {
  return (
    <Stack component="nav" id="nav-section-vertical" {...other}>
      {data.map((group, index) => (
        <Group key={index} items={group.items} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

function Group({ items, slotProps }: NavGroupProps) {
  const renderContent = items.map((list) => (
    <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
  ));

  return <Stack sx={{ px: 2, py: 2 }}>{renderContent}</Stack>;
}
