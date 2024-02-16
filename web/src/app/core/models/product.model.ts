// user.model.ts

import { Size } from "./size.model";

export class Product {
    ID: number;
    Name: string;
    CreatedAt: string;
    Description: string
    Price: number
    Sizes: Size
  
    // You can add more properties based on your requirements
  
    constructor(ID: number, Name: string, CreatedAt: string,Description: string,Price: number,Sizes: Size ){
      this.ID = ID;
      this.Name = Name;
      this.CreatedAt = CreatedAt;
      this.Description = Description;
      this.Price = Price;
      this.Sizes = Sizes;
    }
  }
  