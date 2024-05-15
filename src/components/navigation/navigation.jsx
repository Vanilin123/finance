'use client'
import Link from "next/link";



const Navigation = () => {

    return (
        <div className="flex h-full items-center flex-row justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
            <div className="flex gap-8 items-center flex-row justify-between">
                <Link href="/" className="text-sm bg-black hover:bg-gray-700 rounded-md p-2 font-semibold flex items-center justify-center text-white transition-all duration-700 rounded-md">
                    <span className=" h8 rounded bg-white text-black p-1.5">Продукты</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center flex-row justify-between">
                    <Link href="/ProductsForm" className="h-1/4 flex items-center justify-center p-1 bg-white hover:bg-black text-black hover:text-white transition-all duration-700 rounded-md">
                        Сформировать ТМЦ
                    </Link>
                    <Link href="/TMC" className=" h-1/4 flex items-center justify-center p-1 bg-white hover:bg-black text-black hover:text-white transition-all duration-700 rounded-md">
                        Сформированные ТМЦ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;