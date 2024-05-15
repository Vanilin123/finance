
import * as XLSX from 'xlsx/xlsx.mjs';
import React from "react";

export function Tmc( item ) {
    function html_table_to_excel(type)
    {
        var data = document.getElementById('employee_data');

        var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

        XLSX.write(file, { bookType:type, bookSST: true, type: 'base64' });

        XLSX.writeFile(file, 'file.' + type);
    }

    const export_button = document.getElementById('export_button');

    export_button?.addEventListener('click', () =>  {
        html_table_to_excel('xlsx');
    });
    return(
        <div className="flex sm:px-8 md:px-12 lg:px-20 xl:px-48 items-center justify-center">
            <div className="flex gap-4 flex-col w-[calc(95vw)] h-[calc(80vh)] bg-rgba-spech rounded-2xl text-black">
                <h1 className="p-2 flex items-center justify-center w-full border-b-[calc(1px)] border-gray-500 text-2xl">{item.TmcName}</h1>
            <table id="employee_data" className="table">
                <thead>
                <tr>
                    <th scope="col">Товар</th>
                    <th scope="col">Номикулатура</th>
                    <th scope="col">Поставщик</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Сумма</th>
                </tr>
                </thead>
                <tbody>
                {item.name?.map((i)=> {
                    <tr>
                        <th scope="row">{i.name}</th>
                        <td className="green">{i.Nomiculature}</td>
                        <td className="green">{i.Supplier}</td>
                        <td className="green">{i.Price}</td>
                        <td className="green">{i.Quantity}</td>
                        <td className="green">{i.Cost}</td>
                    </tr>
                })}
                </tbody>
            </table>
            <div className="flex__vigr">
                <button id="export_button" className='flex flex-row gap-2 items-center p-2 w-full justify-center w-full border-[calc(1px)] border-gray-500 hover:bgWhite transition-all duration-700'>Выгрузить</button>
            </div>
            </div>
        </div>
    )
}