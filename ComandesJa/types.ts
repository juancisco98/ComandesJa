import React from 'react';

export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    business: string;
    content: string;
    avatar: string;
}

export interface NavItem {
    label: string;
    href: string;
}