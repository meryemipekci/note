import { Outlet, useParams, Navigate } from "react-router-dom";
import { Note } from "../types";

type LayoutPropsType = {
  notes: Note[];
};

//url den aldigi id ye gore dogru notu bulacak
//ve bu notun bilgisini butun cocuk route'lara aktaricak
const Layout = ({ notes }: LayoutPropsType) => {
  const { id } = useParams();
  //   note u bul
  const found = notes.find((n) => n.id === id);

  //eger ki note bulunmazsa ana sayfaya yonlendır
  if (!found) return <Navigate to={"/"} replace />;
  //alt route u ekrana bas ve url e gore
  //aldıgımız notu prop gonderme
  return <Outlet context={found} />;
};

export default Layout;
