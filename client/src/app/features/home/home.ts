import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatButton, RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  email: string = '';
  subscriptionMessage: string = '';

  // Featured products data
  featuredProducts = [
    {
      id: 1,
      name: 'Professional Drill Set',
      description: 'Complete 50-piece drill bit set with storage case',
      price: 49.99,
      originalPrice: 62.49,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      tag: '-20%',
    },
    {
      id: 2,
      name: 'Cordless Impact Driver',
      description: 'High-power driver with fast charging battery',
      price: 129.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=400&fit=crop',
      tag: 'New',
    },
    {
      id: 3,
      name: '120-Piece Tool Kit',
      description: 'Complete hand tool set with professional organizer',
      price: 99.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1533090161054-e1ee8dca8d6d?w=400&h=400&fit=crop',
      tag: 'Popular',
    },
  ];

  categories = [
    {
      name: 'Power Tools',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&h=500&fit=crop',
    },
    {
      name: 'Hand Tools',
      image: 'https://images.unsplash.com/photo-1586864387789-628dbe1f4fa1?w=500&h=500&fit=crop',
    },
    {
      name: 'Safety Equipment',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop',
    },
  ];

  features = [
    {
      title: 'Premium Quality',
      description: 'Tested and certified tools from trusted brands worldwide',
      emoji: '⭐',
    },
    {
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and promotions',
      emoji: '💰',
    },
    {
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
      emoji: '🚚',
    },
    {
      title: 'Expert Support',
      description: '24/7 customer service ready to help you choose',
      emoji: '🤝',
    },
  ];

  // Handle newsletter subscription
  onSubscribe() {
    if (this.email && this.email.includes('@')) {
      this.subscriptionMessage =
        '✓ Thank you for subscribing! Check your inbox for exclusive deals.';
      this.email = '';
      // Reset message after 5 seconds
      setTimeout(() => {
        this.subscriptionMessage = '';
      }, 5000);
    } else {
      this.subscriptionMessage = '⚠ Please enter a valid email address';
      setTimeout(() => {
        this.subscriptionMessage = '';
      }, 3000);
    }
  }

  // Add to cart handler
  addToCart(product: any) {
    console.log('Added to cart:', product);
    // You can add actual cart logic here later
  }
}
