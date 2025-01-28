import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
export interface CarouselItem {
  thumbnail: string; // Vertical thumbnail
  hthumbnail: string; // Horizontal thumbnail
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  items: CarouselItem[] = [
    { thumbnail: './assets/VID_52969_thumb_v.jpg', hthumbnail: './assets/VID_52969_thumb.jpg', title: 'APOCALYPTO', description: 'FIRLIN WOODS' },
    { thumbnail: './assets/VID_53291_thumb_v.jpg', hthumbnail: './assets/VID_53291_thumb.jpg', title: 'SHAITAAN', description: 'Prime Special' },
    { thumbnail: './assets/VID_53399_thumb_v.jpg', hthumbnail: './assets/VID_53399_thumb.jpg', title: 'SALAAR', description: 'Lorem ipsum...' },
    { thumbnail: './assets/VID_52969_thumb_v.jpg', hthumbnail: './assets/VID_52969_thumb.jpg', title: 'APOCALYPTO', description: 'FIRLIN WOODS' },
    { thumbnail: './assets/VID_53291_thumb_v.jpg', hthumbnail: './assets/VID_53291_thumb.jpg', title: 'SHAITAAN', description: 'Prime Special' },
    { thumbnail: './assets/VID_53399_thumb_v.jpg', hthumbnail: './assets/VID_53399_thumb.jpg', title: 'SALAAR', description: 'Lorem ipsum...' },
    { thumbnail: './assets/VID_52969_thumb_v.jpg', hthumbnail: './assets/VID_52969_thumb.jpg', title: 'APOCALYPTO', description: 'FIRLIN WOODS' },
    { thumbnail: './assets/VID_53291_thumb_v.jpg', hthumbnail: './assets/VID_53291_thumb.jpg', title: 'SHAITAAN', description: 'Prime Special' },
    { thumbnail: './assets/VID_53399_thumb_v.jpg', hthumbnail: './assets/VID_53399_thumb.jpg', title: 'SALAAR', description: 'Lorem ipsum...' },
    { thumbnail: './assets/VID_52969_thumb_v.jpg', hthumbnail: './assets/VID_52969_thumb.jpg', title: 'APOCALYPTO', description: 'FIRLIN WOODS' },
    { thumbnail: './assets/VID_53291_thumb_v.jpg', hthumbnail: './assets/VID_53291_thumb.jpg', title: 'SHAITAAN', description: 'Prime Special' },
    { thumbnail: './assets/VID_53399_thumb_v.jpg', hthumbnail: './assets/VID_53399_thumb.jpg', title: 'SALAAR', description: 'Lorem ipsum...' },
  ];

  currentIndex = 0;
  visibleItems = 4; 
  hoveredIndex: number | null = null;

  get visibleItemsList(): CarouselItem[] {
    return this.items.slice(this.currentIndex, this.currentIndex + this.visibleItems);
  }

  next(): void {
    if (this.currentIndex + this.visibleItems < this.items.length) {
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  onHover(index: number): void {
    this.hoveredIndex = index;
  }

  onLeave(): void {
    this.hoveredIndex = null;
  }
}