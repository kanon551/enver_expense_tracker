import React, { useState } from 'react';
import styled from 'styled-components';
import { ExpenseProperty } from '../global/ExpenseReducer';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface ExpenseCardProperty {
    object: ExpenseProperty;
    editExpense: () => void;
    deleteExpense: () => void;
}

interface ExpenseCardProps {
    category: "Salary" | "Groceries" | "Fun" | "Rent";
}

const CardContainer = styled.div<ExpenseCardProps>`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  cursor: pointer;

  &:hover {
    .icons {
      display: flex;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
  }

  &::before {
    left: 0;
    background: ${(props) => (props.category === "Salary" ? 'darkseagreen' : 'palevioletred')};
  }

  &::after {
    right: 0;
    background: ${(props) => (props.category === "Salary" ? 'darkseagreen' : 'palevioletred')};
  }
`;



const CardImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 16px;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Amount = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: x-large;
`;

const Description = styled.div`
  margin-bottom: 8px;
`;

const Date = styled.div`
  color: grey;
  margin-bottom: 8px;
  position: absolute;
  top : 0px;
  right: 5px;
`;

const CustomChip = styled(Chip)`
  position: absolute;
  bottom : 0px;
  right: 0px;
  border-bottom-right-radius: 0px !important;
  border-top-right-radius: 0px !important;
`;

const IconsContainer = styled.div`
  display: none;
  align-items: center;
  position: absolute;
  right: 15%;
  bottom: 0px;

  .MuiSvgIcon-root {
    margin-right: 4px;
    cursor: pointer;
  }
`;



const ExpenseCard = ({ object, editExpense, deleteExpense }: ExpenseCardProperty) => {

    const [showIcons, setShowIcons] = useState(false);

    const handleMouseEnter = () => {
        setShowIcons(true);
    };

    const handleMouseLeave = () => {
        setShowIcons(false);
    };

    const getImageAddress = (category: ExpenseProperty['category']): string => {
        switch (category) {
            case 'Salary':
                return 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png';
            case 'Groceries':
                return 'https://blog.alfagift.id/wp-content/uploads/2023/03/groceries.jpg';
            case 'Fun':
                return 'https://www.21kschool.com/blog/wp-content/uploads/2022/09/10-Fun-Educational-Activities-to-Do-at-Home.png';
            case 'Rent':
                return 'https://www.avail.co/wp-content/uploads/2022/02/how-to-make-money-from-renting-out-a-property.jpg';
            default:
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
        }
    };

    return (
        <CardContainer category={object.category}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <CardImage src={getImageAddress(object.category)} alt="Expense" />
            <Description>{object.description}</Description>
            <CardDetails>
                <Date>{object.date}</Date>
                <Amount>₹{object.amount}</Amount>
                <CustomChip label={object.category} color="primary" />
                {showIcons && (
                    <IconsContainer className="icons">
                        <EditIcon onClick={editExpense} />
                        <DeleteIcon onClick={deleteExpense} />
                    </IconsContainer>
                )}
            </CardDetails>
        </CardContainer>
    );
};

export default ExpenseCard;
