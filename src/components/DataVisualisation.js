import { Alert, Box, Button, Grid, Paper, Popover, Step, StepConnector, StepContent, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { dataLineChart, optionsLineChart } from '../sample_data/lineChartData'
import { dataBarChart, optionsBarChart } from '../sample_data/barChartData'
import { dataDoughnutChart, optionsDoughnutChart } from '../sample_data/doughnutChartData'
import { dataPieChart, optionsPieChart } from '../sample_data/pieChartData'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import "react-resizable/css/styles.css";
import { ReadFile, Charts, ChangeChartData } from './Charts'
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';



function DataVisualisation() {

  const [activeStep, setActiveStep] = useState(0);
  const [activeChart, setActiveChart] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const [title, setTitle] = useState('Title');
  const [fileData, setFileData] = useState([]);
  const [errMsg, setErrMsg] = useState(null);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setErrMsg(null)
    setActiveStep(0);
    setActiveChart(null);
    setTitle('Title');
    setFileData([]);
  };


  const selectChart = (e) => {
    if (activeChart) {
      setActiveChart(null);
    } else {
      setActiveChart(e.currentTarget.id);
    }
  };

  const showSampleFile = (event, popoverId, data) => {
    setAnchorEl(event.currentTarget);
    setActivePopover(popoverId)

    setTimeout(() => {
      const rows = []
      for (let i = 0; i < (data.labels).length; i++) {
        let cols = {}
        cols[data.labelsHead] = data.labels[i];
        for (let x = 0; x < ((data.datasets).length); x++) {
          cols[data.datasets[x].label] = data.datasets[x].data[i]
        }
        rows[i] = cols;

      }

      var worksheet = XLSX.utils.json_to_sheet(rows);
      var container = document.getElementById(popoverId);
      container.innerHTML = XLSX.utils.sheet_to_html(worksheet);
    }, 100)
  };

  const hideSampleFile = () => {
    setAnchorEl(null);
    setActivePopover(null)
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const setData = (fileData, errMsg = null) => {
    setFileData(fileData)
    setErrMsg(errMsg)
  }

  const updateData = (data) => {
    setFileData(data)
  }


  return (
    <Box sx={{ mt: 10 }}>
      <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
        <Button component={Link} to="/" variant="contained" size="small">Back to the main page</Button>
      </Box>
      <Stepper activeStep={activeStep} orientation="vertical" connector={<StepConnector sx={{ padding: 0, marginLeft: 0 }} />}>

        <Step>
          <StepLabel>
            Select a chart!(Click on it!)
          </StepLabel>
          <StepContent sx={{ marginLeft: 0, paddingLeft: 1, pddingRight: 0 }}>

            <Grid container>

              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="text" onClick={(e) => { showSampleFile(e, 'prevLineChart', dataLineChart) }} sx={{ textTransform: 'inherit', textDecoration: 'underline' }}>Sample csv</Button>
                  <Popover
                    open={Boolean(anchorEl) && activePopover === 'prevLineChart'}
                    anchorEl={anchorEl}
                    onClose={hideSampleFile}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div id="prevLineChart" style={{ fontSize: 12 }} className="prevChart"></div>
                  </Popover>
                </div>
                <div id="lineChart" onClick={selectChart} style={{ backgroundColor: activeChart === 'lineChart' ? '#F5F5F5' : 'inherit' }}>
                  <Chart type="line" options={optionsLineChart} data={dataLineChart} />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="text" onClick={(e) => { showSampleFile(e, 'prevBarChart', dataBarChart) }} sx={{ textTransform: 'inherit', textDecoration: 'underline' }}>Sample csv</Button>
                  <Popover
                    open={Boolean(anchorEl && activePopover === 'prevBarChart')}
                    anchorEl={anchorEl}
                    onClose={hideSampleFile}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div id="prevBarChart" style={{ fontSize: 12 }} className="prevChart"></div>
                  </Popover>
                </div>
                <div id="barChart" onClick={selectChart} style={{ backgroundColor: activeChart === 'barChart' ? '#F5F5F5' : 'inherit' }}>
                  <Chart type="bar" options={optionsBarChart} data={dataBarChart} />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="text" onClick={(e) => { showSampleFile(e, 'prevDoughnutChart', dataDoughnutChart) }} sx={{ textTransform: 'inherit', textDecoration: 'underline' }}>Sample csv</Button>
                  <Popover
                    open={Boolean(anchorEl && activePopover === 'prevDoughnutChart')}
                    anchorEl={anchorEl}
                    onClose={hideSampleFile}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div id="prevDoughnutChart" style={{ fontSize: 12 }} className="prevChart"></div>
                  </Popover>
                </div>
                <div id="doughnutChart" onClick={selectChart} style={{ backgroundColor: activeChart === 'doughnutChart' ? '#F5F5F5' : 'inherit' }}>
                  <Chart type="doughnut" options={optionsDoughnutChart} data={dataDoughnutChart} />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="text" onClick={(e) => { showSampleFile(e, 'prevPieChart', dataPieChart) }} sx={{ textTransform: 'inherit', textDecoration: 'underline' }}>Sample csv</Button>
                  <Popover
                    open={Boolean(anchorEl && activePopover === 'prevPieChart')}
                    anchorEl={anchorEl}
                    onClose={hideSampleFile}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div id="prevPieChart" style={{ fontSize: 12 }} className="prevChart"></div>
                  </Popover>
                </div>
                <div id="pieChart" onClick={selectChart} style={{ backgroundColor: activeChart === 'pieChart' ? '#F5F5F5' : 'inherit' }}>
                  <Chart type="pie" options={optionsPieChart} data={dataPieChart} />
                </div>
              </Grid>

            </Grid>
            <Box sx={{ mt: 6, mb: 2 }}>
              <div>
                {activeChart ? <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>Continue</Button> : ''}
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>
          Choose your data file(xls, xlsx or csv)! The program do not save or store your file!
          </StepLabel>
          <StepContent sx={{ marginLeft: 0, paddingLeft: 1, pddingRight: 0 }}>
            <Box sx={{ mb: 2 }}>
              <div>
                {errMsg ? <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert> : ''}
                <ReadFile chart={activeChart} setData={setData} />
                {fileData.labels ? <Typography variant="body2" sx={{ mb: 2, color: 'green' }}>File is selected!</Typography> : ''}
              </div>
              <div>
                {fileData.labels && !errMsg ? <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }} color="success">Continue</Button> : ''}
                <Button onClick={() => [handleBack(), handleReset()]} sx={{ mt: 1, mr: 1 }}>Back</Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>
          You can customize your chart, then download your chart as png!
          </StepLabel>
          <StepContent sx={{ marginLeft: 0, paddingLeft: 1, pddingRight: 0 }}>
            <Box sx={{ mb: 2 }}>
              <TextField label="Title of the chart" variant="outlined" value={title} onChange={changeTitle} />
            </Box>
            <Box sx={{ mb: 2 }}>
              <div>
                <ChangeChartData data={fileData} updateData={updateData} />
              </div>
              <div>
                <Charts chart={activeChart} title={title} data={fileData} handleNext={handleNext} />
              </div>
              <div>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>Back</Button>
              </div>
            </Box>
          </StepContent>
        </Step>

      </Stepper>
      {activeStep === 3 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Get new chart
          </Button>

        </Paper>
      )}
    </Box>
  );

}

export default DataVisualisation;
