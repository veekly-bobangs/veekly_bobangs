'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  IconHome2,
  IconSettings,
  IconLogout,
  IconMap2,
  IconLogin,
} from '@tabler/icons-react';
import { Group } from '@mantine/core';
import classes from './Navbar.module.css';
import { PAGE_PATHS, PAGE_NAMES, getPageNameFromPagePath } from '@/constants';
import { useAuthContext } from '@/contexts';

const data = [
  { link: PAGE_PATHS.HOME, label: PAGE_NAMES.HOME, icon: IconHome2},
  { link: PAGE_PATHS.MAP, label: PAGE_NAMES.MAP, icon: IconMap2 },
  { link: PAGE_PATHS.SETTINGS, label: PAGE_NAMES.SETTINGS, icon: IconSettings },
];

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const pathname = usePathname()
  const [active, setActive] = useState(getPageNameFromPagePath(pathname));

  const links = data.map((item) => (
    <a
      href={item.link}
      key={item.label}
      className={classes.link}
      data-active={item.label === active || undefined}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {user && <Group className={classes.header} justify="space-between">
          { user?.email }
        </Group>}
        {links}
      </div>

      <div className={classes.footer}>
          {
            user ?
              <a className={classes.link} onClick={logout}>
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Logout</span>
              </a>:
              <a href={PAGE_PATHS.LOGIN} className={classes.link} onClick={(event) => event.preventDefault()}>
                <IconLogin className={classes.linkIcon} stroke={1.5} />
                <span>Login</span>
              </a>
          }
      </div>
    </nav>
  );
}
