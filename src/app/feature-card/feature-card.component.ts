import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feature-card',
  imports: [FormsModule,CommonModule,],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.css'
})
export class FeatureCardComponent {
  @Input() icon: string = ''; // 'home', 'key', 'users' to determine which SVG to show
  @Input() title: string = '';
  @Input() description: string = '';

  constructor() { }
}
