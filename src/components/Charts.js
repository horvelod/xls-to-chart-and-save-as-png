import { Box, Button } from '@mui/material';
import React, {useRef, useState } from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { HSLToHex, randomColor } from './helpers';


export function ReadFile(props) {

  const startingRow = 1;

  function read(e) {
    const file = e.target.files[0];
    const allowedExtensions = /(\.csv|\.xls|\.xlsx)$/i;

    if (!allowedExtensions.exec(file.name)) {
      let data = {};
      props.setData(data, 'Invalid file type')
      return false;
    }


    let reader = new FileReader();

    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      const content = e.target.result;
      const wb = XLSX.read(content, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      let getLabels = [];
      let getLabel = '';
      let dataSets = [];
      let dataSet = {};
      const countCols = jsonData[0].length;
      let dataErr = ''

      for (let col = 0; col < countCols; col++) {
        let getData = [];
        let getColors = [];
        for (let row = 0; row < jsonData.length; row++) {
          if (col === 0 && row >= startingRow) {
            getLabels.push(jsonData[row][0]);
          }
          if (col > 0 && row > 0) {
            getData.push(jsonData[row][col]);
            getColors.push(randomColor());
          }
          if (col > 0 && row === 0) {
            getLabel = jsonData[row][col];
          }
        }

        if (col > 0) {
          let backgroundColor;
          let borderColor;
          const rmColor = randomColor();
          switch (props.chart) {
            case 'lineChart':
              backgroundColor = '#ffffff';
              borderColor = rmColor;
              break;
            case 'barChart':
              backgroundColor = rmColor;
              borderColor = rmColor;
              break;
            case 'doughnutChart':
              backgroundColor = getColors;
              borderColor = '#ffffff';
              break;
              case 'pieChart':
              backgroundColor = getColors;
              borderColor = '#ffffff';
              break;
              default: 
              backgroundColor = '#ffffff';
              borderColor = rmColor;
              break;
          }
          dataSet = {
            id: 'col_' + col,
            label: getLabel,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: getData,
          }
          dataSets.push(dataSet);
        }
      }


      let data = {
        labels: getLabels,
        datasets: dataSets
      };

      if (data.labels) {
        props.setData(data, dataErr)
      }

    }
  }

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" component="label" sx={{ mb: 3 }}>
        Select your datafile
        <input
          type="file"
          hidden
          onChange={read}
          style={{ marginBottom: 20 }}
        />
      </Button>
    </React.Fragment>
  );

}



export function Charts(props) {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState('100%');
  const [outPos, setOutPos] = useState({ position: 'static', left: 'auto' });

  const options = {

    borderWidth: function (context) {
      const width = Math.round(context.chart.width);
      const size = width < 2000 ? 3 : 6;

      return size
    },
    scales: {
      y: {
        display: props.chart === 'doughnutChart' || props.type === 'pieChart' ? false : true,
        ticks: {
          font: function (context) {
            const width = context.chart.width;
            const size = Math.round(width / 64) < 12 ? 12 : Math.round(width / 64);

            return {
              size: size
            };
          }
        }
      },
      x: {
        display: props.chart === 'doughnutChart' || props.type === 'pieChart' ? false : true,
        ticks: {
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 64) < 12 ? 12 : Math.round(width / 64);

            return {
              size: size
            };
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 64) < 12 ? 12 : Math.round(width / 64);

            return {
              size: size
            };
          }
        },
      },
      title: {
        display: true,
        text: props.title,
        font: function (context) {
          var width = context.chart.width;
          var size = Math.round(width / 64) < 12 ? 12 : Math.round(width / 64);

          return {
            weight: 'bold',
            size: size
          };
        }
      },
    },

  };


  const saveChart = () => {

    setOutPos({ position: 'absolute', left: -999999 })
    setChartWidth(window.devicePixelRatio < 2 ? 2000 : 1000)

    setTimeout(() => {
      const chart = chartRef.current;
      const canvas = chart.canvas
      const ctx = chart.ctx;
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const url = chart.toBase64Image();
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute("type", "hidden");
      a.download = 'my.png';
      a.href = url;
      a.click()
      document.body.removeChild(a);
      props.handleNext()
    }, 500)

  }

  return (
    <div style={{ display: 'flexbox' }}>
      {props.data.labels ? <Box id="chartBox" sx={{ width: chartWidth }}>
        <Chart ref={chartRef} style={outPos} type={(props.chart).replace('Chart', '')} options={options} data={props.data} />
      </Box> : ''}
      {props.data.labels ? <Button variant="contained" onClick={() => { saveChart(); }} sx={{ mt: 6, mr: 1 }}>Save your chart as png image</Button> : ''}
    </div>
  );

}

export function ChangeChartData(props) {

  const changeBorderColor = (e, i) => {
    const datasetsCopy = props.data.datasets.slice(0)
    datasetsCopy[i].borderColor = e.currentTarget.value
    const data = Object.assign({}, props.data, { datasets: datasetsCopy })
    props.updateData(data)
  }

  const changeBgColor = (e, i, iBg=-1) => {
    const datasetsCopy = props.data.datasets.slice(0)
    if(iBg === -1) {
      datasetsCopy[i].backgroundColor = e.currentTarget.value
    }else{
      datasetsCopy[i].backgroundColor[iBg] = e.currentTarget.value
    }
    const data = Object.assign({}, props.data, { datasets: datasetsCopy })
    props.updateData(data)
  }


  return (
    <div>
      <div style={{marginTop: 20, marginBottom: 20}}>Change colors</div>
    {(props.data.datasets).map((res, i) => {
      return <div key={i} style={{ display: 'flex' }}>
        <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>
          {res.label} Bg-Border(s)
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <input type="color" value={(res.borderColor).includes('#') ? res.borderColor : HSLToHex(res.borderColor)} onChange={(event) => {changeBorderColor(event, i)}} />
        </div>-
        <div style={{display: 'flex', alignItems: 'center'}}>
          { Array.isArray(res.backgroundColor) ? 
          (res.backgroundColor).map((resBg, iBg)=>{
           return <input key={iBg} type="color" value={(resBg).includes('#') ? resBg : HSLToHex(resBg)} onChange={(event) => {changeBgColor(event, i, iBg)}} style={{marginRight: 5}} />
          })
          : <input type="color" value={(res.backgroundColor).includes('#') ? res.backgroundColor : HSLToHex(res.backgroundColor)} onChange={(event) => {changeBgColor(event, i)}} />}
        </div>
      </div>
    })}
    </div>
  )
}


