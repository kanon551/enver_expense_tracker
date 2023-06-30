import React, { useState, ChangeEvent, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseProperty, addExpense, updateExpense } from '../global/ExpenseReducer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


interface WrappedExpenseProps {
  obj: ExpenseProperty;
  status: "Add" | "Edit";
  statusSignal: (signal: boolean) => void;
}

const AddExpenses = ({ obj, status, statusSignal }: WrappedExpenseProps) => {

  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const dispatch = useDispatch();
  const allExpenses = useSelector((state: any) => state.expenses);

  const [inputValue, setInputValue] = useState<number>(0);
  const [inputError, setInputError] = useState(false);
  const [desc, setDesc] = useState('');

  const [category, setCategory] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };


  useEffect(() => {
    if (status === 'Edit') {
      setValue(dayjs(`${obj.date}`));
      setInputValue(Math.abs(obj.amount));
      setDesc(obj.description);
      setCategory(obj.category);
    }
  }, [status, obj]);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      const parsedValue = value ? Math.abs(parseFloat(value)) : 0;
      setInputValue(parsedValue);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const manipuateExpenses = () => {
    if (inputValue === 0) {
      const variant: VariantType = 'error';
      enqueueSnackbar('Add Amount', { variant });
    }
    else if (category === "") {
      const variant: VariantType = 'error';
      enqueueSnackbar('Choose Category', { variant });
    }
    else {

      const formattedDate = value ? value.format('YYYY-MM-DD') : '';

      if (status === "Add") {
        dispatch(addExpense({ id: allExpenses[allExpenses.length - 1].id + 1, amount: category === "Salary" ? inputValue : -inputValue, description: desc, date: formattedDate, category: category }))
      }
      else if (status === "Edit") {
        dispatch(updateExpense({ id: obj.id, amount: category === "Salary" ? inputValue : -inputValue, description: desc, date: formattedDate, category: category }))
      }

      setValue(dayjs());
      setInputValue(0);
      setDesc('');
      setCategory('');
      statusSignal(true);
    }
  }

  const clearAll = () => {
    setValue(dayjs());
    setInputValue(0);
    setDesc('');
    setCategory('');
    statusSignal(true);
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>

      <div>
        {
          status === "Edit" ? "Edit Expense" : "New Expense"
        }
        <FormControl fullWidth error={inputError} sx={{ marginBottom: '1vh', marginTop: '1vh' }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={inputValue}
            onChange={handleInputChange}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="Amount"
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*\\.?[0-9]*',
            }}
          />
          {inputError && <FormHelperText>Please enter only numbers.</FormHelperText>}
        </FormControl>

        <TextField
          id="outlined-controlled"
          label="Description"
          value={desc}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDesc(event.target.value);
          }}
          sx={{ marginBottom: '1vh' }}
        />

        <FormControl fullWidth sx={{ marginBottom: '1vh' }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value={'Salary'}>Salary</MenuItem>
            <MenuItem value={'Groceries'}>Groceries</MenuItem>
            <MenuItem value={'Fun'}>Fun</MenuItem>
            <MenuItem value={'Rent'}>Rent</MenuItem>
          </Select>
        </FormControl>


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              sx={{ marginBottom: '1vh' }}
            />
          </DemoContainer>
        </LocalizationProvider>

      </div>
      <Button variant="contained" onClick={manipuateExpenses}>
        {
          status === "Edit" ? "Update" : "Add"
        }
      </Button>
      <HighlightOffIcon sx={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }} onClick={clearAll} />
    </Box>

  )
}

const WrappedExpenses = ({ obj, status, statusSignal }: WrappedExpenseProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AddExpenses obj={obj} status={status} statusSignal={statusSignal} />
    </SnackbarProvider>
  );
};

export default WrappedExpenses;
