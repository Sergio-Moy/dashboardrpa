function DataEstados ({data}){
    data = data.filter(element => element.status != "ok")
    let filas = []
    data.forEach(element => {
        let fila = <tr>
            <td>{element.maq}</td>
            <td>{element.status}</td>
        </tr> 
        filas.push(fila)   
    });
    return <div>
        <h2>Últimos estados reportados</h2>
        <table>
            <thead>
                <th>Máquina</th>
                <th>Estado</th>
            </thead>
            <tbody>
                {filas}
            </tbody>
        </table>
    </div>
}

export default DataEstados