export interface Payment {
    id: number;
    razorpayOrderId: string;
    status: string; // e.g., 'created', 'success', 'failed'
    email: string;
    amount: string; // Stored as string to handle currency precision and avoid floating point issues
    userId: number;
    sellerId: number;
    createdAt: string; // ISO 8601 string for date and time
    propertyId: number;
  }