import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { ExpenseProperty } from '../global/ExpenseReducer';
import styled from 'styled-components';


const DetailedAnalysis = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1.5vh;
`

const CategoryName = styled.div`
font-size: larger;
display: flex;
flex-direction: column;
`

const Amount = styled.div`
font-size: larger;
display: flex;
flex-direction: column;
`
const BalanceAmount = styled.span`
margin: 1.5vh;
font-size: x-large;
`

const DonutChart = () => {
  const allExpenses = useSelector((state:any) => state.expenses);

ChartJS.register(ArcElement, Tooltip, Legend);

const calculateCategorySums = (expenses: ExpenseProperty[]): number[] => {
  const categorySums: Record<string, number> = {};

  expenses.forEach((expense: ExpenseProperty) => {
    const { amount, category } = expense;
    if (categorySums[category]) {
      categorySums[category] += amount;
    } else {
      categorySums[category] = amount;
    }
  });

  return Object.values(categorySums);
};


const categorySums = calculateCategorySums(allExpenses);
const totalSum = categorySums.reduce((acc, curr) => acc + curr, 0);



 const data = {
  labels: ["Fun" , "Groceries" , "Rent","Salary" ],
  datasets: [
    {
      label: 'Category cost is',
      data: categorySums,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <div>
      Expenses Analysis
      <Doughnut data={data} redraw={true}/>

      <DetailedAnalysis>
        <CategoryName>
          {
            ["Fun" , "Groceries" , "Rent","Salary" ].map((categiry)=> (
              <div>{categiry}</div>
            ))
          }
        </CategoryName>
        <Amount>
          {
            categorySums.map((amount)=> (
              <div>{amount}</div>
            ))
          }
        </Amount>
      </DetailedAnalysis>

      Balance Amount is <BalanceAmount>{totalSum}</BalanceAmount>
    </div>

  )
}

export default DonutChart
