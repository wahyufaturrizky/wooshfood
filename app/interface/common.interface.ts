export interface ResSalesOrder {
  status: string;
  msg: string;
  result: number;
}

export interface Product {
  id: number;
  name: string;
  list_price: number;
  type: string;
  description_sale: boolean;
}
