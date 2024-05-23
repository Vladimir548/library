import {Link} from "react-router-dom";

interface IAddButton {
    url:string,
    label:string
}
export default function AddButton({url,label}:IAddButton) {
    return (
        <div className={'w-full'}>
        <Link className={'border border-blue-600 rounded-lg duration-300 ease-linear py-2 px-3 mb-3 hover:bg-blue-600/50'} to={url}>{label}</Link>
        </div>
    );
}