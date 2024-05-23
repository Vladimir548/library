import {Link} from "react-router-dom";

interface IEditingButton {
    url:string

}

export default function EditingButton({url}:IEditingButton) {
    return (
        <div>
            <Link className={'border text-white  py-2 px-3 rounded-lg border-yellow-600 ease-linear duration-300 hover:bg-yellow-600'} to={url}>Редактировать</Link>
        </div>
    );
}