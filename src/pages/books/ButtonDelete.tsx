

interface IButtonDelete{
    id:number,
    dispatchFn:(id:number)=> void
}

export default function ButtonDelete({id,dispatchFn}:IButtonDelete) {

    return (
        <div>
        <button onClick={()=>dispatchFn(id)} className={'border text-white  py-2 px-3 rounded-lg border-red-600 ease-linear duration-300 hover:bg-red-600'}>Удалить</button>
        </div>
    );
}