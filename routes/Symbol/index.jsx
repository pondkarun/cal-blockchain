import { useState } from "react";
import { Avatar } from "@material-ui/core";

const Symbol = ({ cryptoList }) => {
  console.log("cryptoList :>> ", cryptoList);

  return (
    <div className="row ">
      {cryptoList
        ? cryptoList.map((e, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2" key={e.id}>
              <div className="row">
                <div className="col-2">
                  <Avatar alt="Remy Sharp" src={e.icon_path} />
                </div>
                <div className="col-7" >
                  {index + 1}. {e.crypto_name} ({e.crypto_initials})
                 
                </div>
                <div className="col-2 ">
                <button type="button" class="btn btn-primary btn-sm">เลือก</button>
                <button type="button" class="btn btn-link btn-sm">จำลอง</button>
                </div>
              </div>
              <hr/>
            </div>
           
          ))
        : null}
    </div>
  );
};

export default Symbol;
