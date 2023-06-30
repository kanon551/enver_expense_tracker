import React, { ChangeEvent, useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from 'styled-components';
import DonutChart from '../components/DonutChart';
import Box from '@mui/material/Box';
import ExpensesList from '../components/ExpensesList';
import WrappedExpenses from '../components/AddExpenses';
import { ExpenseProperty } from '../global/ExpenseReducer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


interface CustomItemProps {
    nobg: boolean;
  }


const CustomItem = styled.div<CustomItemProps>`
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: ${(props) => (props.nobg ? 'none' : 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px')};
    background-color: ${(props) => (props.nobg ? 'transparent' : 'rgb(255, 255, 255)')};
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    padding: 8px;
    text-align: center;
    width: ${(props) => (props.nobg ? '-webkit-fill-available' : 'none')};
    color: rgba(0, 0, 0, 0.6);
`

const Home = () => {

    const matches1440 = useMediaQuery('(min-width:1440px)');
    const matches768 = useMediaQuery('(min-width:768px)');

    const options = ["Salary",'Groceries','Fun','Rent'];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    const handleCategorySelection = (event: ChangeEvent<{}>, value: string[]) => {
        setSelectedCategories(value);
      };


    const [obj, setObj] = useState<ExpenseProperty>({
        id: 0,
        amount: 0,
        description: '',
        date: '',
        category: "Salary",
    })

    const [status, setStatus] = useState<"Add" | "Edit">('Add');
    const edit = (index: number, object: ExpenseProperty) => {
        setObj(object)
        setStatus('Edit')
    }

    const receivedSignal = (signal: boolean)=> {
        if(signal === true){
            setStatus("Add");
        }
    }

    const searchByDesc = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
      };

    

  return (
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                {
                    matches768 && 
                    <Grid item xs sm md lg xl sx={{ display: 'flex',justifyContent: 'center',flexDirection:'column', position:'sticky', top:'10%', height: '100%'}}>
                         <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginTop:'2vh', marginBottom:'2vh'}}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search by description"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={searchByDesc}
                            />
                            
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>

                            <Autocomplete
                            sx={{marginBottom:'2vh'}}
                            multiple
                            value={selectedCategories}
                            onChange={handleCategorySelection}
                            id="controllable-states-demo"
                            options={options}
                            renderInput={(params) => <TextField {...params} label="Filter by Category" sx={{background:'white'}}/>}
                            />

                        <CustomItem nobg={false}>
                            <WrappedExpenses obj={obj} status={status} statusSignal={(signal:boolean)=>receivedSignal(signal)}/>
                        </CustomItem>

                       
                    </Grid>
                }
                
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ display: 'flex', alignItems:'center', flexDirection:'column',justifyContent: 'center', marginTop:'2vh',marginBottom: '3vh' }}>
                    {
                        !matches768 &&
                        <>
                         <CustomItem nobg={false}>
                            <WrappedExpenses obj={obj} status={status} statusSignal={(signal:boolean)=>receivedSignal(signal)}/>
                        </CustomItem>

                        <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginTop:'2vh', marginBottom:'2vh', width:'-webkit-fill-available'}}
                        >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search by description"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={searchByDesc}
                        />

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        </Paper>

                        <Autocomplete
                            sx={{marginBottom:'2vh'}}
                            fullWidth
                            multiple
                            value={selectedCategories}
                            onChange={handleCategorySelection}
                            id="controllable-states-demo"
                            options={options}
                            renderInput={(params) => <TextField {...params} label="Filter by Category" sx={{background:'white'}}/>}
                            />

                        </>
                       
                    }
                    <CustomItem nobg={true}>
                        <ExpensesList 
                        onEditClick={(index: number, object:ExpenseProperty) => edit(index, object)} 
                        keyword={searchTerm}
                        categoryFilter={selectedCategories}/>
                    </CustomItem>
                    {
                        !matches1440 && 
                            <CustomItem nobg={false}>
                                <DonutChart/>
                            </CustomItem>
                    }
                </Grid>
                {
                    matches1440 && 
                    <Grid item xs sm md lg xl sx={{ display: 'flex',justifyContent: 'center', position:'sticky', top:'10%',height:'100%'}}>
                    <CustomItem nobg={false}>
                        <DonutChart/>
                    </CustomItem>
                    </Grid>
                }
               
            </Grid>
        </Box>
  )
}

export default Home
