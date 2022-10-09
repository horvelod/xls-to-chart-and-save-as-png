import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { randomColor } from './randomColor';




function Reader(props) {

  const startingRow = 1;

  function read(e) {
    const file = e.target.files[0];
    const allowedExtensions = /(\.csv|\.xls|\.xlsx)$/i;

    if (!allowedExtensions.exec(file.name)) {
      console.log('Invalid file type');
      let data = {};
      props.setData(data)
      return false;
    }


    let reader = new FileReader();

    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      const content = e.target.result;
      const wb = XLSX.read(content, { type: 'binary' });
      console.log(wb)
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      let getLabels = [];
      let getLabel = '';
      let dataSets = [];
      let dataSet = {};
      const countCols = jsonData[0].length;

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
          let bgColor;
          let borderColor;
          const rmColor = randomColor();
          switch (props.chart) {
            case 'lineChart':
              bgColor = 'white';
              borderColor = rmColor;
              break;
            case 'barChart':
              bgColor = rmColor;
              borderColor = rmColor;
              break;
            case 'doughnutChart':
              bgColor = getColors;
              borderColor = 'white';
              break;
          }
          dataSet = {
            label: getLabel,
            backgroundColor: bgColor,
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
        props.setData(data)
      }

      // setFileData(data);
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

export default Reader;
