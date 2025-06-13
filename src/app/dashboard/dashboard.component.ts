// // dashboard.component.ts
// import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { PropertyService } from '../services/property.service';
// import { Property } from '../models/property.model';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class DashboardComponent implements OnInit {
//   selectedPropertyId: number;
//   properties: Property[] = [];
//   loading = true;
//   currentPage = 1;
//   pageSize = 6;
//   totalPages = 1;
//   pagedProperties: Property[] = [];
//   // filteredProperties = [...this.properties];
//   editId: number | null = null;
//   originalProperty: any = null;
//   showFilters = false;
//   location = '';
//   minPrice = 0;
//   maxPrice = 10000000;
//   type = 'apartment';
//   userId=parseInt(localStorage.getItem("userId"));
//   role=localStorage.getItem("role");

//   constructor(
//     private propertyService: PropertyService,
//     private router: Router,
//     public authService: AuthService,
//     private http: HttpClient
//   ) { this.getAllProperties(); }

//   ngOnInit(): void {
//     //this.getAllProperties();
//   }

//   enableEdit(property: any): void {
//     this.editId = property.propertyId;
//     this.originalProperty = { ...property }; // clone for cancel
//   }


//   cancelEdit(): void {
//     const index = this.properties.findIndex((p: { propertyId: number | null; }) => p.propertyId === this.editId);
//     if (index !== -1) {
//       this.properties[index] = this.originalProperty;
//     }
//     this.editId = null;
//     this.originalProperty = null;
//   }

//   saveEdit(property: any): void {
//     this.propertyService.updateProperty(property).subscribe({
//       next: () => {
//         this.editId = null;
//         this.originalProperty = null;
//       },
//       error: (err) => {
//         console.error('Update failed:', err);
//         alert('Failed to update property.');
//       }
//     });
//   }


//   getAllProperties(): void {
//     this.propertyService.getProperties().subscribe({
//       next: (data) => {
//         this.properties = data;
//         this.updatePagination();
//       },
//       error: (err) => console.error('Error fetching all properties:', err)
//     });
//   }

//   getPropById() {
//     this.propertyService.getPropById(parseInt(localStorage.getItem("userId"))).subscribe({
//       next:(data) => {
//         this.properties=data;
//         this.updatePagination();
//         console.log("These are my properties",this.properties);
//       },
//       error:(err)=>console.error('Error fetching the data',err)
//     })
//     //console.log("These are my properties",this.pagedProperties);
//   }
//   updatePagination() {
//     const start = (this.currentPage - 1) * this.pageSize;
//     const end = start + this.pageSize;
//     this.totalPages = Math.ceil(this.properties.length / this.pageSize);
//     this.pagedProperties = this.properties = this.properties.slice(start, end);
//   }
//   changePage(page: number) {
//     if (page < 1 || page > this.totalPages) return;
//     this.currentPage = page;
//     this.updatePagination();
//   }
//   getPropertyById(): void {
//     const id = prompt('Enter Property ID:');
//     if (id) {
//       this.propertyService.getPropertyById(+id).subscribe({
//         next: (data) => {
//           this.pagedProperties = [data]; // Display single property in table
//           console.log('Property by ID:', data);
//         },
//          error: (err) => {
//           console.error('Error fetching property by ID:', err);
//           alert("Property Not Found");
//          }
//       });
//     }
//   }


//   saveProperty(): void {
//     this.router.navigate(['/propform']);
//   }

//   deleteProperty(id: number): void {
//     if (confirm('Are you sure you want to delete this property?')) {
//       this.propertyService.deleteProperty(id).subscribe({
//         next: () => {
//           console.log('Property deleted successfully');
//           this.getAllProperties();
//         },
//         error: (err) => console.error('Error deleting property:', err)
//       });
//     }
//   }


//   getSoldOutProperties(): void {
//     this.propertyService.getSoldOutProperties().subscribe({
//       next: (data) => {
//         this.pagedProperties = data;
//         console.log('Sold Out Properties:', data);
//       },
//       error: (err) => console.error('Error fetching sold out properties:', err)
//     });
//   }

//   trackByPropertyId(index: number, property: any): number {
//     return property.propertyId;
//   }

//   getRandomGradient(): string {
//     const gradients = [
//       'linear-gradient(135deg, #4361ee, #3a0ca3)',
//       'linear-gradient(135deg, #f72585, #b5179e)',
//       'linear-gradient(135deg, #4cc9f0, #4895ef)',
//       'linear-gradient(135deg, #7209b7, #560bad)',
//       'linear-gradient(135deg, #3a86ff, #8338ec)',
//       'linear-gradient(135deg, #ff006e, #ffbe0b)'
//     ];
//     return gradients[Math.floor(Math.random() * gradients.length)];
//   }

//   isDarkMode = false;
//   toggleDarkMode(event: Event): void {
//     this.isDarkMode = (event.target as HTMLInputElement).checked;
//   }

//   getPagesArray(): number[] {
//     return Array(this.totalPages).fill(0).map((_, i) => i + 1);
//   }

//   getImagePath(property: any): string {
//     const type = property.type?.toLowerCase() || '';
//     switch (type) {
//       case 'villa':
//         return 'house.jpg';
//       case 'apartment':
//         return 'loginbg.jpg';
//       case 'house':
//         return 'loginbg1.jpg';
//       default:
//         return 'loginbg2.jpg';
//     }
//   }
//   pay(property: Property) {
//     //property.status = "soldOut";
//     this.selectedPropertyId = property.propertyId;
//      // Only if you're routing
//     // let pid = property.propertyId
//     console.log("This is pid", this.selectedPropertyId);
//     console.log("This is in pay funtion:",property.sellerId);
//     // localStorage.setItem("propertyId", pid.toString());
//     localStorage.setItem("price", property.price.toString());
//     console.log("status is ", property.status);
//     this.router.navigate(['/payment'],{state:{propId:this.selectedPropertyId,sellerId:property.sellerId}});
//   }

//   Booking(property:Property) {
//     this.router.navigate(['/bookform'],{state:{propId:this.selectedPropertyId,sellerId:property.sellerId}});
//   }
//   Inquiry(property:Property) {
//     this.router.navigate(['/inqform'],{state:{propId:this.selectedPropertyId,sellerId:property.sellerId}});
//   }

//   toggleFilters() {
//     this.showFilters = !this.showFilters;
//   }

//   applyFilters() {
//     const params = {
//       location: this.location,
//       minPrice: this.minPrice,
//       maxPrice: this.maxPrice,
//       type: this.type
//     };
//     this.http.get<any[]>('http://localhost:9091/properties/search', { params }).subscribe(data => {
//       this.pagedProperties = data;
//       this.showFilters = false;
//       // Optionally navigate or display results
//       console.log(this.pagedProperties)
//     });

//   }
// }



// dashboard.component.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  selectedPropertyId: number;
  properties: Property[] = []; // This should hold ALL properties
  pagedProperties: Property[] = []; // This will hold properties for the current page
  loading = true;
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  editId: number | null = null;
  originalProperty: any = null;
  showFilters = false;
  location = '';
  minPrice = 0;
  maxPrice = 10000000;
  type = 'apartment';
  userId = parseInt(localStorage.getItem("userId"));
  role = localStorage.getItem("role");

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    public authService: AuthService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { } // Removed initial call here, better to call in ngOnInit

  ngOnInit(): void {
    // Determine which set of properties to load based on role or other logic
    if (this.role === 'admin') { // Example: If admin, show all properties
      this.getAllProperties();
    } else if (this.userId) { // Example: If user, show their properties
      this.getPropById(); // Assuming this fetches properties for the current user
    } else {
      this.getAllProperties(); // Default for other cases
    }
  }

  enableEdit(property: any): void {
    this.editId = property.propertyId;
    this.originalProperty = { ...property }; // clone for cancel
  }

  cancelEdit(): void {
    const index = this.properties.findIndex((p: { propertyId: number | null; }) => p.propertyId === this.editId);
    if (index !== -1) {
      // Revert the property in the main `properties` array
      this.properties[index] = this.originalProperty;
      // Also update the paged properties to reflect the change immediately if it's on the current page
      const pagedIndex = this.pagedProperties.findIndex((p: { propertyId: number | null; }) => p.propertyId === this.editId);
      if (pagedIndex !== -1) {
        this.pagedProperties[pagedIndex] = this.originalProperty;
      }
    }
    this.editId = null;
    this.originalProperty = null;
  }

  saveEdit(property: any): void {
    this.propertyService.updateProperty(property).subscribe({
      next: () => {
        this.editId = null;
        this.originalProperty = null;
        // After successful save, refresh the current page's data
        this.updatePagination();
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update property.');
      }
    });
  }

  getAllProperties(): void {
    alert("Fetching all properties...");
    this.propertyService.getProperties().subscribe({
      next: (data) => {
        this.properties = data; // Store all properties
        this.currentPage = 1; // Reset to first page when new data is loaded
        this.updatePagination();
        this.loading = false;
        this.cd.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching all properties:', err);
        this.loading = false;
      }
      
    });
  }

  getPropById() {
    this.propertyService.getPropById(parseInt(localStorage.getItem("userId"))).subscribe({
      next: (data) => {
        this.properties = data; // Store all properties for the user
        this.currentPage = 1; // Reset to first page
        this.updatePagination();
        this.loading = false;
        this.cd.detectChanges(); 
        console.log("These are my properties", this.properties);
      },
      error: (err) => {
        console.error('Error fetching the data', err);
        this.loading = false;
      }
    })
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.properties.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    // Slice from the main `properties` array and assign to `pagedProperties`
    this.pagedProperties = this.properties.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  getPropertyById(): void {
    const id = prompt('Enter Property ID:');
    if (id) {
      this.propertyService.getPropertyById(+id).subscribe({
        next: (data) => {
          // When fetching a single property by ID, you likely want to display only that property
          // and not affect the general pagination state.
          this.pagedProperties = [data];
          this.totalPages = 1; // Only one page if showing a single item
          this.currentPage = 1;
          console.log('Property by ID:', data);
          this.cd.detectChanges(); 
        },
        error: (err) => {
          console.error('Error fetching property by ID:', err);
          alert("Property Not Found");
          // Optionally, revert to displaying all properties or clear the view
          // this.getAllProperties();
        }
      });
    }
  }

  saveProperty(): void {
    this.router.navigate(['/propform']);
  }

  deleteProperty(id: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          console.log('Property deleted successfully');
          this.getAllProperties(); // Re-fetch all properties to update the list and pagination
        },
        error: (err) => console.error('Error deleting property:', err)
      });
    }
  }

  getSoldOutProperties(): void {
    this.propertyService.getSoldOutProperties().subscribe({
      next: (data) => {
        this.properties = data; // Set the main properties array to sold out properties
        this.currentPage = 1; // Reset to first page
        this.updatePagination(); // Update pagination based on this new data
        console.log('Sold Out Properties:', data);
      },
      error: (err) => console.error('Error fetching sold out properties:', err)
    });
  }

  trackByPropertyId(index: number, property: any): number {
    return property.propertyId;
  }

  getRandomGradient(): string {
    const gradients = [
      'linear-gradient(135deg, #4361ee, #3a0ca3)',
      'linear-gradient(135deg, #f72585, #b5179e)',
      'linear-gradient(135deg, #4cc9f0, #4895ef)',
      'linear-gradient(135deg, #7209b7, #560bad)',
      'linear-gradient(135deg, #3a86ff, #8338ec)',
      'linear-gradient(135deg, #ff006e, #ffbe0b)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  isDarkMode = false;
  toggleDarkMode(event: Event): void {
    this.isDarkMode = (event.target as HTMLInputElement).checked;
  }

  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  getImagePath(property: any): string {
    const type = property.type?.toLowerCase() || '';
    switch (type) {
      case 'villa':
        return 'house.jpg'; // Assuming images are in assets/images
      case 'apartment':
        return 'loginbg.jpg';
      case 'house':
        return 'loginbg1.jpg';
      default:
        return 'loginbg2.jpg';
    }
  }
  pay(property: Property) {
    this.selectedPropertyId = property.propertyId;
    console.log("This is pid", this.selectedPropertyId);
    console.log("This is in pay funtion:", property.sellerId);
    localStorage.setItem("price", property.price.toString());
    console.log("status is ", property.status);
    this.router.navigate(['/payment'], { state: { propId: this.selectedPropertyId, sellerId: property.sellerId } });
  }

  Booking(property: Property) {
    this.router.navigate(['/bookform'], { state: { propId: property.propertyId, sellerId: property.sellerId } });
  }
  Inquiry(property: Property) {
    this.router.navigate(['/inqform'], { state: { propId: property.propertyId, sellerId: property.sellerId } });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    const params: any = {};
    if (this.location) params.location = this.location;
    if (this.minPrice > 0) params.minPrice = this.minPrice;
    if (this.maxPrice < 10000000) params.maxPrice = this.maxPrice;
    if (this.type) params.type = this.type;

    this.http.get<any[]>('http://localhost:9091/properties/search', { params }).subscribe(data => {
      this.properties = data; // Filtered results become the new base for pagination
      this.currentPage = 1; // Reset to the first page for filtered results
      this.updatePagination();
      this.showFilters = false;
      console.log(this.pagedProperties);
    });
  }
}