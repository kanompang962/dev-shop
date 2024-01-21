// user.model.ts

export class Product {
    ID: number;
    Name: string;
    CreatedAt: string;
    Description: string
    Price: number
  
    // You can add more properties based on your requirements
  
    constructor(ID: number, Name: string, CreatedAt: string,Description: string,Price: number ){
      this.ID = ID;
      this.Name = Name;
      this.CreatedAt = CreatedAt;
      this.Description = Description;
      this.Price = Price;
    }
  }
  