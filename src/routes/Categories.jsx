import React,{ useState } from 'react';
import Header from '../components/Header';
import CategoryMini from '../components/CategoryMini';
import '../styles/categories.css';

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

const Categories = () => {
    const [categories, setItems] = useState(CategoriesInitState);

    return (
        <div>
        <Header />
        <h2>Категории</h2>
        <ul className='categories'>
            {categories.map((category) => (
                <CategoryMini key={category.id} {...category} />
            ))}
        </ul>
        </div>
    );
}
export default Categories;