import React from "react"
import Chart from "react-google-charts"

function UltimaProgramada ({ data, colors }) {
    data = data.filter(item => 
        item.user === "Ejecuci�n programada"
    )
    data = data.reverse()
    let apps = []
    let filtered = []
    data.forEach(element => {
      if(!apps.includes(element.app)){
        apps.push(element.app)
        filtered.push(element)
      }  
    });
    data = filtered
    let arr = [
        ["App", "Última ejecución"]
    ]
    data.forEach(element => {
        let fecha = new Date(element.timestamp)
        let now = new Date()
        let diff = ((now - fecha) / (1000 * 60 * 60));
        arr.push([element.app, diff])    
    });
    let chart
    if (arr.length > 1){
        chart = <Chart
                chartType="ColumnChart"
                data={arr}
                options={
                    {
                        colors: colors,
                        vAxis: {
                        minValue : 0,
                        textStyle : {color : 'white'}
                    },
                        hAxis: {
                            textStyle : {color : 'white'}
                        },
                    backgroundColor: { fill:'transparent' },
                legend: 'none',
                chartArea: {width: 500, left: 25, right: 25} }
                }
            />
    }
    else{
        chart = <p>No se tienen datos de ejecuciones programadas para las apps seleccionadas.</p>
    }
    return <div>
        <h3>Ejecuciones automáticas más recientes</h3>
            {chart}
    </div>
}

export default UltimaProgramada