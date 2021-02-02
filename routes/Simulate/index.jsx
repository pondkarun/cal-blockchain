import { useState } from "react";
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

  const [isEditTable, setIsEditTable] = useState(true);
  const [modelSave, setModelSave] = useState({
    amount: 10000,
    number: 10,
    rate_start: 8,
    rate_end: 9.5,
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
    const vatCost = Number((cost * vat).toFixed(2)); //ค่าธรรมเนียม 0.25% ซื้อ

    for (let x = 0; x < modelSave.number; x++) {
      const buyPrice = Number(
        (x === 0
          ? modelSave.rate_end - rate
          : tempDate[x - 1].buyPrice - rate
        ).toFixed(2)
      ); //คำนวณ ชื้อราคา
      const amount = Number(((cost - vatCost) / buyPrice).toFixed(8)); //คำนวณ จำนวน
      const sellPrice = Number(
        (buyPrice + (buyPrice * modelSave.profit) / 100).toFixed(2)
      ); //คำนวณ ราคาขาย

      const vatSellPrice = Number((amount * sellPrice * vat).toFixed(2)); //ค่าธรรมเนียม 0.25% ขาย
      const sales = Number((amount * sellPrice - vatSellPrice).toFixed(2)); //คำนวณ ยอดขาย
      const profit = Number(sales - cost).toFixed(2); //คำนวณ กำไร
      tempDate.push({
        num: x + 1, //ไม้
        buyPrice, //ชื้อราคา
        cost, //ทุน
        amount, //จำนวน
        sellPrice, //ราคาขาย
        sales, //ยอดขาย
        profit, //กำไร
      });
      sum = sum + Number(profit);
    }

    setSumProfit(sum.toLocaleString("en-US", { minimumFractionDigits: 2 }));
    setRows(tempDate);
  };

  const calculateIndex = (index) => {
    
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
                          defaultValue={row.buyPrice}
                          onChange={(e) => {
                            rows[index].buyPrice = Number(e.target.value);
                            setRows([...rows]);
                          }}
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
                          defaultValue={row.cost}
                          onChange={(e) => {
                            const vatCost = Number((e.target.value * vat).toFixed(2)); //ค่าธรรมเนียม 0.25% ซื้อ
                            rows[index].amount = Number(((e.target.value - vatCost) / rows[index].buyPrice).toFixed(8)); //คำนวณ จำนวน
                            rows[index].cost = Number(e.target.value);
                            setRows([...rows]);
                          }}
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
                          defaultValue={row.sellPrice}
                          onChange={(e) => {
                            const vatSellPrice = Number((rows[index].amount * Number(e.target.value) * vat).toFixed(2)); //ค่าธรรมเนียม 0.25% ขาย
                            rows[index].sales = Number((rows[index].amount * Number(e.target.value) - vatSellPrice).toFixed(2))
                            rows[index].sellPrice = Number(e.target.value);
                            rows[index].profit = Number(rows[index].sales - rows[index].cost).toFixed(2); //คำนวณ กำไร
                            setRows([...rows]);
                          }}
                        />
                      ) : (
                          row.sellPrice
                        )}
                    </TableCell>
                    <TableCell align="center">{row.sales}</TableCell>
                    <TableCell align="center">{row.profit}</TableCell>
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
