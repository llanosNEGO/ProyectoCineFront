import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export interface Slide {
  url: string;
  text: string;
  imagen: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  @Input() slides: Slide[] = [];
  @ViewChild('slider', { static: true }) slider!: ElementRef;

  currentIndex: number = 0;

  showSlide(index: number): void {
    this.currentIndex = (index + this.slides.length) % this.slides.length;

    // Apply transform to the slider element
    const offset = -this.currentIndex * 100;
    this.slider.nativeElement.style.transform = `translateX(${offset}%)`;
  }

  nextSlide(): void {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide(): void {
    this.showSlide(this.currentIndex - 1);
  }
}
