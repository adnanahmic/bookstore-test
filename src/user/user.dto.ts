export class RegisterDTO {
  _id?: string;
  username: string;
  password: string;
  authorPsuedonym: string;
}

export class LoginDTO {
  username: string;
  password: string;
}
