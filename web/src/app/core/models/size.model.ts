export class Size {
  [x: string]: any;
    ID: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    Name?: string;
    SizeNameID: number;
    SizeName: any;
    Amount: number
  
    constructor(
      ID: number,
      CreatedAt: string,
      UpdatedAt: string,
      DeletedAt: string,
      Name: string,
      SizeNameID: number,
      SizeName: any,
      Amount: number
    ) {
      this.ID = ID;
      this.CreatedAt = CreatedAt;
      this.UpdatedAt = UpdatedAt;
      this.DeletedAt = DeletedAt;
      this.Name = Name;
      this.SizeNameID = SizeNameID;
      this.Amount = Amount;
      this.SizeName = SizeName;
    }
  }
  