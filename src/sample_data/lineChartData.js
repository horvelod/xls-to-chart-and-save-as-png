
export const dataLineChart = {
  labelsHead: 'Months',
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
      {
        label: 'Company 1',
        data: [0, 100, 60, 80, 50, 30],
        borderColor: 'red',
        backgroundColor: 'white',
      },
      {
        label: 'Company 2',
        data: [100, 10, 60, 80, 50, 90],
        borderColor: 'blue',
        backgroundColor: 'white',
      },
      {
        label: 'Company 3',
        data: [50, 140, 40, 15, 140, 130],
        borderColor: 'yellow',
        backgroundColor: 'white',
      },
      {
        label: 'Company 4',
        data: [70, 100, 10, 60, 100, 70],
        borderColor: 'green',
        backgroundColor: 'white',
      },
  ]
};

  export const optionsLineChart = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxHeight: 2,
          boxWidth: 4,
        }
      },
      title: {
        display: true,
        text: 'Line chart title',
      },
    },
  };
