type User={
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // תשקול אם לחשוף את הסיסמה ב-DTO
    createdAt: Date;
    updatedAt: Date;
  }
  

  export default User