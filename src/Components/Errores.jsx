import React from 'react';

function Errores ({data}) {
    data = data.filter(item =>
        item.funcion == "Error"
    )
    data = data.slice(-5).reverse()
    let errores = []
    data.forEach(element => {
        errores.push(<tr>
            <td>{element.timestamp.split("T")[0] + " " + element.timestamp.split("T")[1].slice(0,8)}</td>
            <td>{element.app}</td>
            <td>{element.hostname}</td>
        </tr>)
    });
    return <div>
        <h3>Últimos 5 errores</h3>
        <table>
        <thead>
            <th>Momento</th>
            <th>Aplicación</th>
            <th>Hostname</th>
        </thead>
        <tbody>
            {errores}
        </tbody>
    </table>
    </div>
}

export default Errores