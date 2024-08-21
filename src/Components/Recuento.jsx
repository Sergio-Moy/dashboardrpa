import React from 'react';
import { Chart } from 'react-google-charts';

function Recuento({ data, colors }) {

    /*const uniqueExecutionIds = data.reduce((acc, obj) => {
        if (!acc[obj.execution_id]) {
          acc[obj.execution_id] = obj;
        }
        return acc;
      }, {});

      data = Object.values(uniqueExecutionIds);*/
    let dataobj = {};

    data.forEach((obj) => {
        if (obj.app in dataobj) {
            dataobj[obj.app] += 1;
        } else {
            dataobj[obj.app] = 1;
        }
    });

    let chartData = [
        ["App", "Count"]
    ];

    Object.keys(dataobj).forEach(function (key) {
        let a = [];
        a.push(key);
        a.push(dataobj[key]);
        chartData.push(a);
    });

    if(!data.length == 0){
    return (
        <div>
            <h3>Logs totales por app</h3>
            <Chart
            chartType='ColumnChart'
            height={"300px"}
            data={chartData}
            options={
                {   
                    colors: colors,
                    vAxis: {
                        minValue : 0,
                        textStyle:{color: 'white'}
                    },
                    hAxis: {
                        textStyle:{color: 'white',
                            fontSize: 8
                        }
                    },
                    titleTextStyle: {
                        color: 'white'
                    },
                    legend: 'none',
                    backgroundColor: {fill : 'transparent'},
                    chartArea: {width: 500, left: 25, right: 25} 
                }
            }
            
        />
        </div>
    );
    }
    else{
        return <p>Por favor seleccione al menos un app</p>
    }
}

export default Recuento;
