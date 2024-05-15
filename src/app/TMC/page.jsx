'use client'
import React, {useEffect, useState} from 'react';
import {collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "@/firebase/firebase";
import Link from "next/link";

const Page = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, "Tmc"), (snapshot)=>
            setProducts(snapshot.docs.map((doc) => (doc.data)())));

    }, []);

    return (
        <div className="flex sm:px-8 md:px-12 lg:px-20 xl:px-48 items-center justify-center">
            <div className="flex gap-4 flex-col w-[calc(95vw)] h-[calc(80vh)] bg-rgba-spech rounded-2xl text-black">
                    <h1 className="p-2 flex items-center justify-center w-full border-b-[calc(1px)] border-gray-500 text-2xl">ТМЦ</h1>
                <div className=' flex items-center justify-center w-full flex-col overflow-y-auto scrollbar'>
                    {products.map((i,index)=>{
                        return(
                            <div className='items-center justify-between p-5 flex flex-row pt-2 pb-2 w-full border-b-[calc(1px)] border-gray-500'>
                                <p>{i.name} №{index} {i.list.map((item)=>{
                                   return <span className='dis-list'>({item.Supplier})</span>
                                })}</p>
                               <Link key={i.id} href={`/TMC/${i.id}`}>Узнать подробнее</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Page;