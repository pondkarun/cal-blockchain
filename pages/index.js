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
    amount: 1000,
    number: 50,
    rate_start: 8,
    rate_end: 9.5,
  });

  const [rows, setRows] = useState([])
  const [currencies, setCurrencies] = useState([
    {
      value: 1,
      label: 'Basic',
    },
  ])



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

            <div style={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" >
                คำนวณ
              </Button>
            </div>

          </Grid>
          <Grid item xs={4}>
          </Grid>

        </Grid>

      </form>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ไม้</TableCell>
              <TableCell align="center">ชื้อราคา</TableCell>
              <TableCell align="center">ทุน</TableCell>
              <TableCell align="center">จำนวน</TableCell>
              <TableCell align="center">ราคาขาย</TableCell>
              <TableCell align="center">ยอดขาย</TableCell>
              <TableCell align="center">กำไร</TableCell>
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
              <TableRow key={row.name}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
              </TableRow>
            ))
            
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Layout >
  );
}
