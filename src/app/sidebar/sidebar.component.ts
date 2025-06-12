import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule,CommonModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = false; // Input to control if sidebar is open
  @Output() closeSidebar = new EventEmitter<void>(); // Output to notify parent to close sidebar

  constructor(private router: Router) { } // Inject Router

  ngOnInit(): void { }

  // Navigate and close sidebar
  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closeSidebar.emit(); // Emit event to close sidebar after navigation
  }
}