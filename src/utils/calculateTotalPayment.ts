import { IOrderAddOn, IService } from "@/libs/interfaces/order";

export function calculateTotalPayment({
  services,
  addOns,
  discount = 0,
}: {
  services: IService[];
  addOns: IOrderAddOn[];
  discount: number;
}): number {
  const serviceTotal = services.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const addOnTotal = addOns.reduce((sum, addOn) => sum + addOn.totalPrice, 0);
  const total = serviceTotal + addOnTotal;
  return total - total * (discount / 100);
}
