import { useContext, createContext, useEffect } from "react";
import axios from "axios";
import { ProductProps } from "../../component/product/ProductCard";
import { UserProps, LogoProps } from "./Interfaces";
interface Children {
  children: React.ReactNode;
}
export interface TValueContext {
  data: ProductProps[];
  setData: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  users: UserProps[];
  setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>;
  Logos: LogoProps[];
  setLogs: React.Dispatch<React.SetStateAction<LogoProps[]>>;
}
export const ApiContext = createContext<TValueContext | null>(null);
function Api({ children }: Children) {
  const [users, setUsers] = React.useState<UserProps[]>([]);
  const [Logos, setLogs] = React.useState<LogoProps[]>([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/brands").then((response) => {
      setLogs(response.data);
      console.log(response);
    });
    axios.get("http://localhost:5173/users").then((response) => {
      setData(response.data);
      console.log(response.data);
      console.log(response);
    });
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ApiContext.Provider
      value={{ data, setData, users, setUsers, Logos, setLogs }}
    >
      {children}
    </ApiContext.Provider>
  );
}
export default Api;
