// user.model.ts

export class User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  FirstName: string;
  LastName: string;
  Img: string;
  Email: string;
  Username: string;
  Password: string;
  RoleID: number;
  Role: number;
  Active: boolean;

  constructor(
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string,
    FirstName: string,
    LastName: string,
    Img: string,
    Email: string,
    Username: string,
    Password: string,
    RoleID: number,
    Role: number,
    Active: boolean
  ) {
    this.ID = ID;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
    this.DeletedAt = DeletedAt;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Img = Img;
    this.Email = Email;
    this.Username = Username;
    this.Password = Password;
    this.RoleID = RoleID;
    this.Role = Role;
    this.Active = Active;
  }
}

  