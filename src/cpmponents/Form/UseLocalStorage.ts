import { useEffect, useState } from "react";

// custom hook
//react hooklarina benzer sekilde gorev yapan projeyı iihtiyacina gore
//kendimiz olusturdugumuz gorevini bizim belirledigimiz hooklardir.
// ! genelde veriyi vaya veriyi guncelleyecek fonk. dizi içinde donerler

export function UseLocalStorage<T>(key: string, initialValue: T) {
  //state i tanımlama
  const [value, setValue] = useState<T>(() => {
    //localden degerleri al
    const jsonValue = localStorage.getItem(key);
    //local de eleman yoksa initial value ile tanımlama
    if (jsonValue === null) {
      return initialValue;
    } else {
      //local de eleman varsa localden veriyi state aktar
      return JSON.parse(jsonValue);
    }
  });
  // 2) state her degiştiginde local i guncelle
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //   hook un kullanılması icin state i ve degiştirma methodunu return et
  return [value, setValue] as [T, typeof setValue];
}
