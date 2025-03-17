export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
  }
  
  export interface ICategory {
    id: number;
    name: string;
  }

  
  export interface ILoginProps {
    email: string;
    password: string;
  }

  export interface ILoginPropsErrors{
    email?: string;
    password?: string;
  }

  export interface IRegisterProps {
    name: string;
    email: string;
    address: string;
    phone: string;
    password: string;
  
  }

  export interface IRegisterPropsErrors{
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
   
  }


  export interface IUserSession {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      address: string;
      phone: string;
      orders: IOrder;
    };
  }

  export interface IOrder {
    id: number;
    status: string;
    date : string;
    products: IProduct[];
  }

  export interface ICategories{
    name: string;
    id: number;
  }

  