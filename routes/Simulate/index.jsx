import { useState, useEffect } from "react";
import { Skeleton } from "@material-ui/lab";

import {
  Grid,
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@material-ui/core";

const Simulate = ({ symbol }) => {
  // console.log("symbol :>> ", symbol);
  const [priceTrade, setspriceTrade] = useState("0")
  useEffect(() => {
    const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
    binanceSocket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data)
      // console.log('jsonData.p', jsonData.p)
      setspriceTrade(Number(jsonData.p))
    }

  }, [])
  const [isEditTable, setIsEditTable] = useState(true);
  const [modelSave, setModelSave] = useState({
    amount: 10000,
    number: 10,
    rate_start: 0.37000,
    rate_end: 0.38000,
    toFixedBuySellPrice: 5,
    profit: 2.06,
  });

  const [vat, setVat] = useState(0.1 / 100);
  const [rows, setRows] = useState([]);
  const [sumProfit, setSumProfit] = useState(0);
  const [currencies, setCurrencies] = useState([
    {
      value: 1,
      label: "Basic",
    },
  ]);

  const calculate = () => {
    // console.log('modelSave :>> ', modelSave);
    const tempDate = [];
    let sum = 0;
    const rate = (modelSave.rate_end - modelSave.rate_start) / modelSave.number; //เรทที่ลดลง แต่ละไม้
    const cost = Number((modelSave.amount / modelSave.number).toFixed(2)); //ทุน
    const vatCost = Number((cost * vat).toFixed(2)); //ค่าธรรมเนียม ซื้อ

    for (let x = 0; x < modelSave.number; x++) {
      const buyPrice = Number((x === 0 ? modelSave.rate_end - rate : tempDate[x - 1].buyPrice - rate).toFixed(modelSave.toFixedBuySellPrice)); //คำนวณ ชื้อราคา
      const amount = Number(((cost - vatCost) / buyPrice).toFixed(8)); //คำนวณ จำนวน
      const sellPrice = Number((buyPrice + (buyPrice * modelSave.profit) / 100).toFixed(modelSave.toFixedBuySellPrice)); //คำนวณ ราคาขาย

      const vatSellPrice = Number((amount * sellPrice * vat).toFixed(2)); //ค่าธรรมเนียม ขาย
      const sales = Number((amount * sellPrice - vatSellPrice).toFixed(2)); //คำนวณ ยอดขาย
      const profit = Number(sales - cost).toFixed(2); //คำนวณ กำไร
      const profitText = Number(profit).toLocaleString("en"); //คำนวณ กำไร
      tempDate.push({
        num: x + 1, //ไม้
        buyPrice, //ชื้อราคา
        cost, //ทุน
        amount, //จำนวน
        sellPrice, //ราคาขาย
        sales, //ยอดขาย
        profit, //กำไร
        profitText, //กำไร
      });
      sum = sum + Number(profit);
    }

    setSumProfit(sum);
    setRows(tempDate);
  };

  const calculateIndex = (index, rows, model, value) => {
    const cost = Number((modelSave.amount / modelSave.number).toFixed(2)); //ทุน
    const vatCost = Number((cost * vat).toFixed(2)); //ค่าธรรมเนียม ซื้อ

    rows[index][model] = Number(value);
    rows[index].amount = Number(((rows[index].cost - vatCost) / rows[index].buyPrice).toFixed(8)); //คำนวณ จำนวน
    if (model !== "sellPrice")
      rows[index].sellPrice = Number((rows[index].buyPrice + (rows[index].buyPrice * modelSave.profit) / 100).toFixed(modelSave.toFixedBuySellPrice));

    const vatSellPrice = Number((rows[index].amount * rows[index].sellPrice * vat).toFixed(2)); //ค่าธรรมเนียม ขาย
    rows[index].sales = Number((rows[index].amount * rows[index].sellPrice - vatSellPrice).toFixed(2)); //คำนวณ ยอดขาย
    rows[index].profit = Number(rows[index].sales - cost).toFixed(2);
    rows[index].profitText = Number(rows[index].profit).toLocaleString("en");
    setRows([...rows]);
    let sum = 0;
    rows.forEach(e => {
      sum = sum + Number(e.profit);
    });
    setSumProfit(sum);
  }

  const startSimulate = () => {
    console.log("rows :>> ", rows);
  };

  return (
    <div>
      <form noValidate autoComplete="off" style={{ paddingBottom: 25 }}>
        <Grid container spacing={3}>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <FormControl fullWidth style={{ paddingBottom: 7 }}>
              <InputLabel htmlFor="standard-adornment-amount">ทุน</InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={modelSave.amount}
                onChange={(event) => {
                  setModelSave({ ...modelSave, amount: event.target.value });
                }}
                startAdornment={
                  <InputAdornment position="start">฿</InputAdornment>
                }
              />
            </FormControl>

            <FormControl fullWidth style={{ paddingBottom: 7 }}>
              <InputLabel htmlFor="standard-adornment-amount">ไม้</InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={modelSave.number}
                onChange={(event) => {
                  setModelSave({ ...modelSave, number: event.target.value });
                }}
                startAdornment={
                  <InputAdornment position="start"> </InputAdornment>
                }
              />
            </FormControl>

            <Grid container spacing={3} style={{ paddingBottom: 10 }}>
              <Grid item md={6}>
                <FormControl fullWidth style={{ paddingBottom: 7 }}>
                  <InputLabel htmlFor="standard-adornment-amount">
                    เรทเริ่มต้น
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    type="number"
                    value={modelSave.rate_start}
                    onChange={(event) => {
                      setModelSave({
                        ...modelSave,
                        rate_start: event.target.value,
                      });
                    }}
                    startAdornment={
                      <InputAdornment position="start"> </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth style={{ paddingBottom: 7 }}>
                  <InputLabel htmlFor="standard-adornment-amount">
                    ถึง
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    type="number"
                    value={modelSave.rate_end}
                    onChange={(event) => {
                      setModelSave({
                        ...modelSave,
                        rate_end: event.target.value,
                      });
                    }}
                    startAdornment={
                      <InputAdornment position="start"> </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth style={{ paddingBottom: 7 }}>
              <InputLabel htmlFor="standard-adornment-amount">
                ทศนิยมราคาขาย (ตำแหน่ง)
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={modelSave.toFixedBuySellPrice}
                onChange={(event) => {
                  setModelSave({ ...modelSave, profit: event.target.value });
                }}
                startAdornment={
                  <InputAdornment position="start"> </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth style={{ paddingBottom: 7 }}>
              <InputLabel htmlFor="standard-adornment-amount">
                กำไร (%)
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={modelSave.profit}
                onChange={(event) => {
                  setModelSave({ ...modelSave, profit: event.target.value });
                }}
                startAdornment={
                  <InputAdornment position="start"> </InputAdornment>
                }
              />
            </FormControl>

            <div style={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={calculate}>
                คำนวณ
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={startSimulate}
              >
                {" "}
                เริ่ม
              </Button>
            </div>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </form>

      <h3 align="left">
        ราคา : {priceTrade} บาท
      </h3>

      <h3 align="right">
        {" "}
        {rows.length > 0
          ? `รวมกำไร (ประมาณ) : ${sumProfit.toLocaleString("en")} บาท`
          : null}{" "}
      </h3>
      <div row="row"></div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ไม้</TableCell>
              <TableCell align="center">ชื้อราคา</TableCell>
              <TableCell align="center">ทุน</TableCell>
              <TableCell align="center">จำนวน</TableCell>
              <TableCell align="center">ราคาขาย</TableCell>
              <TableCell align="center">ยอดขาย (ประมาณ)</TableCell>
              <TableCell align="center">กำไร (ประมาณ)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length <= 0 ? (
              <TableRow key="loading">
                <TableCell align="center">
                  <Skeleton />
                </TableCell>
                <TableCell align="center">
                  <Skeleton />
                </TableCell>
                <TableCell align="center">
                  <Skeleton />
                </TableCell>
                <TableCell align="center">
                  <Skeleton />
                </TableCell>
                <TableCell align="center">
                  <Skeleton />
                </TableCell>
                <TableCell align="center">
                  <Skeleton />
                </TableCell>
                <TableCell align="center">
                  <Skeleton />
                </TableCell>
              </TableRow>
            ) : (
                rows.map((row, index) => (
                  <TableRow key={row.num}>
                    <TableCell align="center">{row.num}</TableCell>
                    <TableCell align="center">
                      {isEditTable ? (
                        <input
                          type="number"
                          className="form-control"
                          value={row.buyPrice}
                          onChange={(e) => calculateIndex(index, rows, "buyPrice", e.target.value)}
                        />
                      ) : (
                          row.buyPrice
                        )}
                    </TableCell>
                    <TableCell align="center">
                      {isEditTable ? (
                        <input
                          type="number"
                          className="form-control"
                          value={row.cost}
                          onChange={(e) => calculateIndex(index, rows, "cost", e.target.value)}
                        />
                      ) : (
                          row.cost
                        )}
                    </TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                      {isEditTable ? (
                        <input
                          type="number"
                          className="form-control"
                          value={row.sellPrice}
                          onChange={(e) => calculateIndex(index, rows, "sellPrice", e.target.value)}
                        />
                      ) : (
                          row.sellPrice
                        )}
                    </TableCell>
                    <TableCell align="center">{row.sales}</TableCell>
                    <TableCell align="center">{row.profitText}</TableCell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Simulate;
