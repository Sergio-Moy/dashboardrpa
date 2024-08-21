import React from 'react';
import { Chart } from 'react-google-charts';

function RecuentoPie({ data, colors }) {

    const uniqueExecutionIds = data.reduce((acc, obj) => {
        if (!acc[obj.execution_id]) {
          acc[obj.execution_id] = obj;
        }
        return acc;
      }, {});

      data = Object.values(uniqueExecutionIds);
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

    let highestCount = 0;

    for (let i = 1; i < chartData.length; i++) {
        let count = chartData[i][1];
        if (count > highestCount) {
            highestCount = count;
        }
    }


    if (!data.length == 0){
        return (
            <div>
                <h3>Ejecuciones por app</h3>
                <Chart
                chartType='PieChart'
                height={"300px"}
                data={chartData}
                options={
                    {   
                        colors: colors,
                        legend: 'right',
                        backgroundColor: {fill:'transparent'},
                        legendTextStyle: {
                            color: 'white',
                            
                        },
                        titleTextStyle : {
                            color: 'white'
                        },
                        chartArea: {width: 600},
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

export default RecuentoPie;
