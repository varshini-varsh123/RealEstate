export interface Inquiry {
    inquiryId?: number; 
    questionerId: number;
    questionerRole: string;
    sellerId: number;
    propertyId: number;
    message: string;
    response?: string; // Optional, can be null
  }
  