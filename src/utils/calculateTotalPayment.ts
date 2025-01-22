import { IOrderAddOn, IOrderService } from "@/libs/interfaces/order";

export function calculateTotalPayment({
  services,
  addOns,
  discount = 0,
}: {
  services: IOrderService[];
  addOns: IOrderAddOn[];
  discount: number;
}): number {
  // Calculate total from services
  const serviceTotal = services.reduce((sum, service) => {
    // Ensure serviceType and price exist
    const servicePrice = service.price || 0;
    return sum + servicePrice;
  }, 0);

  // Calculate total from add-ons
  const addOnTotal = addOns.reduce((sum, addOn) => {
    // Use quantity * price for add-on total
    const addOnPrice = addOn.quantity * (addOn.price || 0);
    return sum + addOnPrice;
  }, 0);

  // Calculate total and apply discount
  const total = serviceTotal + addOnTotal;
  const discountedTotal = total - total * (discount / 100);

  return Math.max(discountedTotal, 0); // Ensure no negative total
}
