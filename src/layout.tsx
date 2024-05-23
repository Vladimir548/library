import Header from "./Header.tsx";

export default function Layout({children} :{children:React.ReactNode}) {
    return (
        <div>
            <header className={'w-full h-[40px] bg-[#333333] mb-[10px]'}>
                <Header/>
            </header>
            <div className={'w-full flex justify-center flex-col'}>
            {children}
            </div>
        </div>
    );
}