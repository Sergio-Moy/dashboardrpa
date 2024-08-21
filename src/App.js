// App.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import log from './log.csv';
import status from './status.csv';
import Recuento from './Components/Recuento';
import RecuentoPie from './Components/RecuentoPie';
import Errores from './Components/Errores';
import UltimaProgramada from './Components/UltimaProgramada';
import Recursos from './Components/Recursos';
import DataEstados from './Components/DataEstados';

function App() {
    const [aux, setAux] = useState(0);
    const [data, setData] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [options, setOptions] = useState([]);
    const [fdata, setFdata] = useState([]);
    const [estados, setEstados] = useState([]);

    const colors = ['#00ffff', '#00c0ff', '#0080ff', '#0040ff', '#0000ff', '#004080', '#008080', '#00ff80']

    const fetchData = async () => {
      const [response1, response2] = await Promise.all([
        fetch(log),
        fetch(status)
    ]);

    const csv1 = await response1.text();
    const parsedData1 = await new Promise((resolve, reject) => {
        Papa.parse(csv1, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => resolve(result),
            error: (error) => reject(error)
        });
    });

    const csv2 = await response2.text();
    const parsedData2 = await new Promise((resolve, reject) => {
        Papa.parse(csv2, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => resolve(result),
            error: (error) => reject(error)
        });
    });

    let opt = Array.from(new Set(parsedData1.data.map(item => item.app)));
    setOptions(opt);
    if (filtro.length === 0 && aux === 0) {
        setFiltro(opt);
    }
    let filteredData = parsedData1.data.filter(item => filtro.includes(item.app));
    setFdata(filteredData);
    setData(parsedData1.data);

    setEstados(parsedData2.data);
    }

    fetchData()
    const handleCheckboxChange = (event) => {
      const {value, checked} = event.target;
      if (checked) {
        setFiltro(prevSelected => [...prevSelected, value]);
      }
      else{
        setFiltro(prevSelected => prevSelected.filter(item => item !== value));
      }
    }

    const checkboxList = options.map((option, index) => (
      <li>
        <label key={index} className='switch'>
        <input type="checkbox" value={option} onChange={handleCheckboxChange} defaultChecked={true}/>{option}
        <span class="slider"></span>
      </label>
      </li>
    )
  );
    useEffect(() => {
      setAux(1)
    }, []);
    return (
        <Container>
          <Row>
            <Col><div className='tarjeta'>
            <Recuento data={fdata} colors={colors}/>
            </div></Col>
            <Col><form>
              <ul>
              {checkboxList}
              </ul>
            </form></Col>
            <Col><div className='tarjeta'>
            <RecuentoPie data={fdata} colors={colors}/></div></Col>
          </Row>
          <Row>
            <Col>
              <Errores data={fdata}/>
            </Col>
            <Col>
            <div className='tarjeta'>
                <UltimaProgramada data={fdata} colors={colors}/>
            </div>
            </Col>
            <Col>
              <Recursos data={data}/>
            </Col>
          </Row> 
        </Container>
    );
}

export default App;
