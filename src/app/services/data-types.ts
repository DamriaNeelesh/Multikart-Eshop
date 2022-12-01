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
  export interface cart{
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

  export interface localCart{
    totalPrice:number;
    totalQuantity:number;
    product_name:string;
    product_category:string;
    product_img:string;
  }
  
  export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
  }
  
  export interface order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined


  }

  export interface beautyProducts {
   id:number;
   brand:string;
   name:string;
   price:string;
   image_link:string;
   description:string;
   category:string;
   product_type:string;
   product_colors:any;
  }
