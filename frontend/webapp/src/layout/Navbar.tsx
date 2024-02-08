'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  IconBellRinging,
  IconHome2,
  IconSettings,
  IconLogout,
  IconMap2,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { PAGE_PATHS, PAGE_NAMES, getPageNameFromPagePath } from '@/constants';

const data = [
  { link: PAGE_PATHS.HOME, label: PAGE_NAMES.HOME, icon: IconHome2},
  { link: PAGE_PATHS.MAP, label: PAGE_NAMES.MAP, icon: IconMap2 },
  { link: PAGE_PATHS.SETTINGS, label: PAGE_NAMES.SETTINGS, icon: IconSettings },
];

export default function Navbar() {
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
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
