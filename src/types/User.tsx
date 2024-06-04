export class User {
  id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  password?: string;
  roles: string[] = [];
  isLoggedIn: boolean = false;
  cart: number = 0;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
