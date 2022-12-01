export interface signUp {
    name: string;
    email: string;
    password: string;
  }
  export interface login {
    email: String;
    password: String;
}

export interface product{
  product_id: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_category: string;
  product_category_type: string;
  product_img:string;
  product_img2:string;
  product_quanity:number;
  product_rating:number;
}