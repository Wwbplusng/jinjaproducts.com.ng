
import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  color: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingOption {
  label: string;
  fee: number;
}

export interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
  author: string;
  color: string;
  excerpt: string;
  content: React.ReactNode;
}

export interface Rank {
  id: number;
  name: string;
  requirements: string[];
  reward: string;
  icon: React.ReactNode;
  color: string;
}
