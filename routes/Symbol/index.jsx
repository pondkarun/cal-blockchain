import { Avatar } from "@material-ui/core";
import Link from 'next/link';

const Symbol = ({ cryptoList }) => {

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
                <Link href={`simulate/${e.crypto_initials.toLowerCase()}usdt`}>
                  <button type="button" className="btn btn-primary btn-sm" >จำลอง</button>
                </Link>
              </div>
            </div>
            <hr />
          </div>

        ))
        : null}
    </div>
  );
};

export default Symbol;
