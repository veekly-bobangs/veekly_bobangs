'use client'

import { useState } from 'react';
import {
  IconBellRinging,
  IconHome2,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconMap2,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '/', label: 'Home', icon: IconHome2},
  { link: '/map', label: 'Map', icon: IconMap2 },
  { link: '', label: 'Settings', icon: IconSettings },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');

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
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
