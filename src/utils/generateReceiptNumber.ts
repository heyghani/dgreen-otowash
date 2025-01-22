import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export function generateReceiptNumber() {
  const date = moment().format("YYYYMMDD");
  const uniqueId = uuidv4().split("-")[0];

  return `${date}-${uniqueId}`;
}
