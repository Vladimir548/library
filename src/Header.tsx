import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className={'text-white flex justify-center items-center gap-4'} >
            <Link className={'hover:underline'}  to={'/'}>Главная</Link>
            <Link className={'hover:underline'}  to={'/books'}>Книги</Link>
            <Link className={'hover:underline'}  to={'/authors'}>Авторы</Link>
        </div>
    );
}