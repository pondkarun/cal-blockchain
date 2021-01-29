import { useState } from "react";
import { getCrypto } from "../../service";

const Symbol = () => {

  getCrypto().then((res) => {
    console.log("res :>> ", res.data.items);
  });
  return (
    <>
      <div>sdsd</div>
    </>
  );
};

export default Symbol;
