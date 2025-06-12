export interface Booking {
    bookingId?: number;
    visitorId: number;
    visitorRole: string;
    sellerId: number;
    propertyId: number;
    status?: string;
    date?: string;
  }
  