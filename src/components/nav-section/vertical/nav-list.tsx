import { useState, useEffect, useCallback } from 'react';

import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import NavItem from './nav-item';
import { NavListProps } from '../types';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps }: NavListProps) {
  const pathname = usePathname();

  const active = useActiveLink(data.path);

  const [openMenu, setOpenMenu] = useState(active);

  useEffect(() => {
    if (!active) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <NavItem
        open={openMenu}
        //
        title={data.title}
        path={data.path}
        icon={data.icon}
        info={data.info}
        caption={data.caption}
        disabled={data.disabled}
        //
        depth={depth}
        externalLink={data.path.includes('http')}
        //
        active={active}
        className={active ? 'active' : ''}
        sx={{
          mb: `${slotProps?.gap}px`,
          ...(depth === 1 ? slotProps?.rootItem : slotProps?.subItem),
        }}
      />
    </>
  );
}
