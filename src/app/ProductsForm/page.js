'use client'
import React, {useEffect, useState} from 'react';
import {collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "@/firebase/firebase";

const ProductsFrom = () => {
    const [inputList, setInputList] = useState([{ Name: "", Nomiculature: "" , Supplier:"", Price:"", Quantity:"",Cost:""}]);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('')

    useEffect(() => {
        onSnapshot(collection(db, "products"), (snapshot)=>
            setProducts(snapshot.docs.map((doc) => (doc.data)())));
        console.log(products)
    }, []);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        console.log(list);
    };

    let obj = inputList.reduce((res, curr) =>
    {
        if (res[curr.Supplier])
            res[curr.Supplier].push(curr);
        else
            Object.assign(res, {[curr.Supplier]: [curr]});

        return res;
    }, {});



    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    console.log(inputList)

// handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { Name: "", Nomiculature: "" , Supplier:"", Price:"", Quantity:"",Cost:"" }]);
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        let obj = inputList.reduce((res, curr) =>
        {
            if (res[curr.Supplier])
                res[curr.Supplier].push(curr);
            else
                Object.assign(res, {[curr.Supplier]: [curr]});

            return res;
        }, {});

        Object.keys(obj).map(async data  => {
            const chatRef = collection(db, "Tmc");
            try {
                const newChatRef = doc(chatRef);


                await setDoc(newChatRef, {
                    id:newChatRef.id,
                    createdAt: serverTimestamp(),
                    name:name,
                    list:obj[data],

                });
                setInputList([{ Name: "", Nomiculature: "" , Supplier:"", Price:"", Quantity:"",Cost:"" }]);
            }
            catch (err) {
                console.log(err);
            }
        })
    }



    return (
        <div className="flex sm:px-8 md:px-12 lg:px-20 xl:px-48 items-center justify-center">
            <div className="flex flex-col gap-4 w-[calc(95vw)] h-[calc(80vh)] bg-rgba-spech rounded-2xl text-black">
                <h1 className='p-2 flex items-center justify-center w-full border-b-[calc(1px)] border-gray-500 text-2xl'>Закупить ТМЦ</h1>
                <div className="flex flex-col w-full">
                    <div className="flex flex-col items-center justify-center w-full border-b-[calc(1px)] border-gray-500">
                        <form onSubmit={handleAdd} className='gap-2 flex flex-col items-center w-full' action="">
                            <input placeholder='Название закупки'
                                   className='placeholder-black bg-transparent p-2 w-full border-b-[calc(1px)] border-gray-500 text-black'
                                   type="text"
                                   onChange={(e) => setName(e.target.value)}
                            />
                            <div className='w-1/3 flex items-center justify-center'>
                                <button type='button' onClick={handleAddClick}
                                        className='flex flex-row gap-2 items-center p-2 w-full justify-center w-full border-[calc(1px)] border-gray-500 hover:bgWhite transition-all duration-700'> Добавить
                                    товар на закупку
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                         viewBox="0 0 32 32" version="1.1">

                                        <title>plus</title>
                                        <desc>Created with Sketch Beta.</desc>
                                        <defs>

                                        </defs>
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Icon-Set" transform="translate(-360.000000, -1035.000000)"
                                               fill="#000000">
                                                <path
                                                    d="M388,1053 L378,1053 L378,1063 C378,1064.1 377.104,1065 376,1065 C374.896,1065 374,1064.1 374,1063 L374,1053 L364,1053 C362.896,1053 362,1052.1 362,1051 C362,1049.9 362.896,1049 364,1049 L374,1049 L374,1039 C374,1037.9 374.896,1037 376,1037 C377.104,1037 378,1037.9 378,1039 L378,1049 L388,1049 C389.104,1049 390,1049.9 390,1051 C390,1052.1 389.104,1053 388,1053 L388,1053 Z M388,1047 L380,1047 L380,1039 C380,1036.79 378.209,1035 376,1035 C373.791,1035 372,1036.79 372,1039 L372,1047 L364,1047 C361.791,1047 360,1048.79 360,1051 C360,1053.21 361.791,1055 364,1055 L372,1055 L372,1063 C372,1065.21 373.791,1067 376,1067 C378.209,1067 380,1065.21 380,1063 L380,1055 L388,1055 C390.209,1055 392,1053.21 392,1051 C392,1048.79 390.209,1047 388,1047 L388,1047 Z"
                                                    id="plus">

                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div className='max-h-72 mt-2 mb-2 overflow-y-scroll scrollbar'>
                                {inputList.map((x, i) => {
                                    return (
                                        <div key={i} className="flex gap-2 flex-row w-full">
                                            <input
                                                className='placeholder-black bg-transparent p-2 w-2/4 border-b-[calc(1px)] border-gray-500 text-black'
                                                name="Name"
                                                placeholder="Название"
                                                value={x.Name}
                                                onChange={e => handleInputChange(e, i)}
                                            />
                                            {products
                                                .filter(item => {
                                                    if (item.name === x.Name) {
                                                        return true
                                                    }
                                                })
                                                .map(item => (
                                                    <div className='flex gap-2 flex-row w-full'>
                                                        <input
                                                            className='placeholder-black bg-transparent p-2 w-2/4 border-b-[calc(1px)] border-gray-500 text-black'
                                                            name="Nomiculature"
                                                            placeholder="Номикулатура"
                                                            value={x.Nomiculature = item.fullName}
                                                            onChange={e => handleInputChange(e, i)}
                                                        />
                                                        <input
                                                            className='placeholder-black bg-transparent p-2 w-2/4 border-b-[calc(1px)] border-gray-500 text-black'
                                                            name="Supplier"
                                                            placeholder="Поставщик"
                                                            value={x.Supplier = item.suppliers.sort(function (x, y) {
                                                                return x.Price - y.Price
                                                            })[0].Name}
                                                            onChange={e => handleInputChange(e, i)}
                                                        />
                                                        <input
                                                            className='placeholder-black bg-transparent p-2 w-2/4 border-b-[calc(1px)] border-gray-500 text-black'
                                                            name="Price"
                                                            placeholder="Цена"
                                                            value={x.Price = item.suppliers.sort(function (x, y) {
                                                                return x.Price - y.Price
                                                            })[0].Price}
                                                            onChange={e => handleInputChange(e, i)}
                                                        />
                                                        <input
                                                            className='placeholder-black bg-transparent p-2 w-2/4 border-b-[calc(1px)] border-gray-500 text-black'
                                                            name="Quantity"
                                                            type="number"
                                                            placeholder="Количество"
                                                            value={x.Quantity}
                                                            onChange={e => handleInputChange(e, i)}
                                                        />
                                                        <input
                                                            className='placeholder-black bg-transparent p-2 w-2/4 border-b-[calc(1px)] border-gray-500 text-black'
                                                            name="Cost"
                                                            placeholder="Поставщик"
                                                            value={x.Cost = x.Quantity * item.suppliers.sort(function (x, y) {
                                                                return x.Price - y.Price
                                                            })[0].Price}
                                                            onChange={e => handleInputChange(e, i)}
                                                        />
                                                    </div>
                                                ))
                                            }
                                            <div
                                                className='flex items-center justify-center bg-transparent p-2 w-1/4 border-b-[calc(1px)] border-gray-500 text-black'>
                                                {inputList.length !== 1 && <button
                                                    onClick={() => handleRemoveClick(i)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                                         viewBox="0 0 24 24" fill="none">
                                                        <path d="M10 11V17" stroke="#000000" strokeWidth="2"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"/>
                                                        <path d="M14 11V17" stroke="#000000" strokeWidth="2"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"/>
                                                        <path d="M4 7H20" stroke="#000000" strokeWidth="2"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"/>
                                                        <path
                                                            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                                            stroke="#000000"
                                                            strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                        <path
                                                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                                            stroke="#000000"
                                                            strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                </button>}
                                            </div>
                                        </div>)
                                })}
                            </div>
                            <button type="submit"
                                    className='flex flex-row gap-2 items-center p-2 w-full justify-center w-full border-[calc(1px)] border-gray-500 hover:bgWhite transition-all duration-700'> Создать
                                ТМЦ
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                     viewBox="0 0 32 32" version="1.1">

                                    <title>plus</title>
                                    <desc>Created with Sketch Beta.</desc>
                                    <defs>

                                    </defs>
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Icon-Set" transform="translate(-360.000000, -1035.000000)"
                                           fill="#000000">
                                            <path
                                                d="M388,1053 L378,1053 L378,1063 C378,1064.1 377.104,1065 376,1065 C374.896,1065 374,1064.1 374,1063 L374,1053 L364,1053 C362.896,1053 362,1052.1 362,1051 C362,1049.9 362.896,1049 364,1049 L374,1049 L374,1039 C374,1037.9 374.896,1037 376,1037 C377.104,1037 378,1037.9 378,1039 L378,1049 L388,1049 C389.104,1049 390,1049.9 390,1051 C390,1052.1 389.104,1053 388,1053 L388,1053 Z M388,1047 L380,1047 L380,1039 C380,1036.79 378.209,1035 376,1035 C373.791,1035 372,1036.79 372,1039 L372,1047 L364,1047 C361.791,1047 360,1048.79 360,1051 C360,1053.21 361.791,1055 364,1055 L372,1055 L372,1063 C372,1065.21 373.791,1067 376,1067 C378.209,1067 380,1065.21 380,1063 L380,1055 L388,1055 C390.209,1055 392,1053.21 392,1051 C392,1048.79 390.209,1047 388,1047 L388,1047 Z"
                                                id="plus">

                                            </path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsFrom;