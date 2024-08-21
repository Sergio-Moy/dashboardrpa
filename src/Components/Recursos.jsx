import React from "react";

function Recursos ({data}) {
    let rev = [...data].reverse()
    let pcs = []
    let filtered = []
    rev.forEach(element => {
        if(!pcs.includes(element.hostname)){
            pcs.push(element.hostname)
            filtered.push(element)
        }
    });
    data = filtered
    let arr = []
    data.forEach(element => {
        arr.push(<tr>
            <td>{element.hostname}</td>
            <td>{element.ram + "%"}</td>
            <td>{Math.round(element.storage)+" GB"}</td>
        </tr>)
    });
    data = filtered
    return <div>
        <h2>Uso de Recursos</h2>
        <table>
        <thead>
            <th>PC</th>
            <th>Uso de RAM</th>
            <th>Almacenamiento disponible</th>
        </thead>
        <tbody>
            {arr}
        </tbody>
    </table>
    </div>
}

export default Recursos