// user.model.ts

export class User {
    id: number;
    username: string;
    email: string;
  
    // You can add more properties based on your requirements
  
    constructor(id: number, username: string, email: string) {
      this.id = id;
      this.username = username;
      this.email = email;
    }
  }
  