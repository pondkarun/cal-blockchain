import Head from 'next/head'
import { useState } from "react";
import Layout from "../components/Layout";
import { Skeleton } from '@material-ui/lab';

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
  MenuItem
} from "@material-ui/core";


export default function Home() {


  const [modelSave, setModelSave] = useState({
    type: 1,
    amount: 10000,
    number: 50,
    rate_start: 8,
    rate_end: 9.5,
    profit: 2.06,
  });

  const [rows, setRows] = useState([]);
  const [sumProfit, setSumProfit] = useState(0);
  const [currencies, setCurrencies] = useState([
    {
      value: 1,
      label: 'Basic',
    },
  ])

  const calculate = () => {
    // console.log('modelSave :>> ', modelSave);
    const tempDate = []
    let sum = 0
    if (modelSave.type === 1) {
      const vat = 0.25 / 100 //ค่าธรรมเนียม 0.25%
      const rate = (modelSave.rate_end - modelSave.rate_start) / modelSave.number //เรทที่ลดลง แต่ละไม้
      const cost = Number((modelSave.amount / modelSave.number).toFixed(2)) //ทุน
      const vatCost = Number((cost * vat).toFixed(2)) //ค่าธรรมเนียม 0.25% ซื้อ

      for (let x = 0; x < modelSave.number; x++) {

        const buyPrice = Number(((x === 0) ? modelSave.rate_end - rate : tempDate[x - 1].buyPrice - rate).toFixed(2)); //คำนวณ ชื้อราคา
        const amount = Number(((cost - vatCost) / buyPrice).toFixed(8)); //คำนวณ จำนวน
        const sellPrice = Number((buyPrice + ((buyPrice * modelSave.profit) / 100)).toFixed(2)); //คำนวณ ราคาขาย

        const vatSellPrice = Number(((amount * sellPrice) * vat).toFixed(2)) //ค่าธรรมเนียม 0.25% ขาย
        const sales = Number(((amount * sellPrice) - vatSellPrice).toFixed(2)) //คำนวณ ยอดขาย
        const profit = Number(sales - cost).toFixed(2)//คำนวณ กำไร
        tempDate.push({
          num: x + 1, //ไม้
          buyPrice, //ชื้อราคา
          cost, //ทุน
          amount, //จำนวน
          sellPrice, //ราคาขาย
          sales, //ยอดขาย
          profit, //กำไร
        })
        sum = sum + Number(profit)

      }

    }

    setSumProfit((sum).toLocaleString("en-US", { minimumFractionDigits: 2 }))
    setRows(tempDate)

  }


  return (
    <Layout>
      <Head>
        <title>คำนวณไม้</title>
      </Head>
      <form noValidate autoComplete="off" style={{ paddingBottom: 25 }}>

        <Grid container spacing={3}>

          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>

            <TextField
              id="standard-select-currency"
              select
              label="ประเภท"
              value={modelSave.type}
              onChange={(event) => { setModelSave({ ...modelSave, type: event.target.value }); }}
              fullWidth
              style={{ paddingBottom: 5 }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <FormControl fullWidth style={{ paddingBottom: 7 }}>
              <InputLabel htmlFor="standard-adornment-amount">ทุน</InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={modelSave.amount}
                onChange={(event) => { setModelSave({ ...modelSave, amount: event.target.value }); }}
                startAdornment={<InputAdornment position="start">฿</InputAdornment>}
              />
            </FormControl>

            <FormControl fullWidth style={{ paddingBottom: 7 }}>
              <InputLabel htmlFor="standard-adornment-amount">ไม้</InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={modelSave.number}
                onChange={(event) => { setModelSave({ ...modelSave, number: event.target.value }); }}
                startAdornment={<InputAdornment position="start"> </InputAdornment>}
              />
            </FormControl>

            <Grid container spacing={3} style={{ paddingBottom: 10 }}>
              <Grid item xs={6}>
                <FormControl fullWidth style={{ paddingBottom: 7 }}>
                  <InputLabel htmlFor="standard-adornment-amount">เรทเริ่มต้น</InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    type="number"
                    value={modelSave.rate_start}
                    onChange={(event) => { setModelSave({ ...modelSave, rate_start: event.target.value }); }}
                    startAdornment={<InputAdornment position="start"> </InputAdornment>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth style={{ paddingBottom: 7 }}>
                  <InputLabel htmlFor="standard-adornment-amount">ถึง</InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    type="number"
                    value={modelSave.rate_end}
                    onChange={(event) => { setModelSave({ ...modelSave, rate_end: event.target.value }); }}
                    startAdornment={<InputAdornment position="start"> </InputAdornment>}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControl fullWidth style={{ paddingBottom: 7 }}>
              <InputLabel htmlFor="standard-adornment-amount">กำไร (%)</InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={modelSave.profit}
                onChange={(event) => { setModelSave({ ...modelSave, profit: event.target.value }); }}
                startAdornment={<InputAdornment position="start"> </InputAdornment>}
              />
            </FormControl>

            <div style={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={calculate}>
                คำนวณ
              </Button>
            </div>

          </Grid>
          <Grid item xs={4}>
          </Grid>

        </Grid>

      </form>

      <h3 align="right"> {rows.length > 0 ? `รวมกำไร (ประมาณ) : ${sumProfit.toLocaleString('en')} บาท` : null} </h3>
      <TableContainer component={Paper} >
        <Table size="small" aria-label="a dense table" >
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
            ) : rows.map((row) => (
              <TableRow key={row.num}>
                <TableCell align="center">{row.num}</TableCell>
                <TableCell align="center">{row.buyPrice}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.sellPrice}</TableCell>
                <TableCell align="center">{row.sales}</TableCell>
                <TableCell align="center">{row.profit}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <br /><br />
    </Layout >
  );
}
