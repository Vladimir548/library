import {Select, SelectItem} from "@nextui-org/react";
import {useAppSelector} from "../../redux/Hooks.tsx";
import {useEffect, useState} from "react";
import {useNavigate,  useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {filterByAuthor} from "../../redux/slice/books.ts";

export default function SelectFilterByAuthor() {
    const {authors} = useAppSelector(state => state.authors)
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';
    const [valueAuthor,setValueAuthor] = useState<string>('' || filter)
    const dispatch =useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        if (filter){
            setValueAuthor(filter)
            dispatch(filterByAuthor(filter))
        }

    },[filter])
    const onChangeAuthor =  ()=>{
        if (valueAuthor) {
            navigate(`/books?filter=${valueAuthor}`)
            setValueAuthor(filter)
            dispatch(filterByAuthor(filter))
        }else {
            navigate(`/books`)
            dispatch(filterByAuthor(''))
        }

    }
    return (
        <div>
            <Select
                label="Выберите автора"
                className="max-w-xs "
                variant={"flat"}
                items={[valueAuthor]}
                onChange={(value)=>setValueAuthor(value.target.value)}
                name={'author'}
                defaultSelectedKeys={[valueAuthor]}
            >
                {authors.map((author) => (
                    <SelectItem  value={author.fullName} key={author.id}>
                        {author.fullName}
                    </SelectItem>
                ))}
            </Select>
            <button className={'border border-green-600 rounded-lg duration-300 ease-linear py-2 px-3 mb-3 hover:bg-green-600/50'} onClick={()=> onChangeAuthor() }>Применить</button>
        </div>
    );
}