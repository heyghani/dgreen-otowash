export interface IOrder {
  id?: number;
  receiptNumber?: string;
  startTime: string;
  finishTime?: string;
  unitNumber: string;
  unitName: string;
  customerName: string;
  address: string;
  phoneNumber: string;
  services: IOrderService[];
  addOns: IOrderAddOn[];
  totalPayment?: number;
  discount?: number;
  totalPaid?: number;
  totalItems?: number;
  totalChanges?: number;
  items: IOrderItem[];
  status: string;
}

export interface IOrderItem {
  id?: number;
  itemName: string;
}

export interface IAddOn {
  id: number;
  addOnName: string;
  price: number;
  orderAddOns?: IOrderAddOn[];
}

export interface IOrderAddOn {
  id?: number;
  orderId?: number;
  addOnId?: number;
  quantity: number;
  price: number;
}

export interface IService {
  id?: number;
  serviceName: string;
  serviceTypes: IServiceType[];
  price: number;
  orderServices?: IOrderService[];
}

export interface IServiceType {
  id?: number;
  serviceType: string;
  price: number;
}

export interface IOrderService {
  id?: number;
  orderId?: number;
  serviceId?: number;
  serviceTypeId?: number;
  price: number;
}
