export interface IOrder {
  id?: number;
  receiptNumber?: string;
  customerId?: string;
  startTime: string;
  finishTime: string;
  unitNumber: string;
  unitName: string;
  customerName: string;
  address: string;
  phoneNumber: string;
  services: IService[];
  addOns: IAddOn[];
  totalPayment?: number;
  discount: number;
  totalPaid?: number;
  totalItems?: number;
  totalChanges?: number;
  items: string[];
}

export interface IAddOn {
  id?: number;
  addOnName: string;
  price: number;
  quantity: number;
}

export interface IOrderAddOn {
  id?: number;
  orderId?: number;
  addOnId?: number;
  quantity?: number;
}

export interface IService {
  id?: number;
  serviceName: string;
  serviceType?: string;
  price: number;
}
