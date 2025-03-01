import React from 'react';
import { useParams } from "react-router-dom"
import NotFound from '../routes/Errors';

const CategoriesInitState = [
    {
      id: "0",
      code: "first",
      name: "Первая категория",
      count: "4",
      description: "Описание первой категории",
    },
    {
      id: "1",
      code: "second",
      name: "Вторая категория",
      count: "3",
      description: "Описание второй категории",
    },
    {
      id: "2",
      code: "third",
      name: "Третья категория",
      count: "2",
      description: "Описание третьей категории",
    },
    {
      id: "3",
      code: "fourth",
      name: "Четвертая категория",
      count: "1",
      description: "Описание четвертой категории",
    },
];

function Category() {
const { categoryCode } = useParams()
const currCategory = CategoriesInitState.find(category => category.code === categoryCode);
if (currCategory) {
    return (
        <div>
            <p>{currCategory.name}</p>
            <p>{currCategory.description}</p>
        </div>
    );
}
else {
    return (
        <NotFound />
    );
}

};
export default React.memo(Category);