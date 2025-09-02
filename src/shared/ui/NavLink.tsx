import React from 'react';
import { Link, type LinkProps } from '@tanstack/react-router';
import { useUserStore } from '../model/useUserStore';

interface NavLinkProps extends Omit<LinkProps, 'className'> {
    children: React.ReactNode;
    className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, className = '', ...props }) => {
    const { isSuperUserSelected } = useUserStore();

    return (
        <Link
            {...props}
            activeProps={{
                className: 'activeLink',
            }}
            inactiveProps={{
                className: 'inactiveLink',
            }}
            className={`navLink ${isSuperUserSelected ? 'border-chart-1' : 'border-chart-2'} ${className}`}
        >
            {children}
        </Link>
    );
};
