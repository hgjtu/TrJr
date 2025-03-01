import React from 'react';
import { Link } from 'react-router';

const CategoryMini = ({ code = "ERROR", name = "ОШИБКА", count = 0 })  => {
let path = "/category/" + code;
return (
    <Link to={path}>
        <li className="category">
            {name}
            <p>Кол-во записей: {count}</p>        
        </li>
    </Link>
    );
};
export default React.memo(CategoryMini);