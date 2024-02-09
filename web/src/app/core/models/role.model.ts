export class Role {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    Name?: string;
  
    constructor(
      ID: number,
      CreatedAt: string,
      UpdatedAt: string,
      DeletedAt: string,
      Name: string
    ) {
      this.ID = ID;
      this.CreatedAt = CreatedAt;
      this.UpdatedAt = UpdatedAt;
      this.DeletedAt = DeletedAt;
      this.Name = Name;
    }
  }
  