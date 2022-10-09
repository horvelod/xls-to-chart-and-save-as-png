
export const dataBarChart = {
  labelsHead: 'Months',
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      id: 1,
      label: 'Company 1',
      data: [0, 10, 60, 80, 50, 30],
      borderColor: 'red',
      borderWidth: 1,
      backgroundColor: 'red',
    },
    {
      id: 2,
      label: 'Company 2',
      data: [100, 10, 60, 80, 50, 90],
      borderColor: 'blue',
      borderWidth: 1,
      backgroundColor: 'blue',
    },
    {
      id: 2,
      label: 'Company 3',
      data: [50, 140, 40, 15, 140, 130],
      borderColor: 'yellow',
      borderWidth: 1,
      backgroundColor: 'yellow',
    },
    {
      id: 2,
      label: 'Company 4',
      data: [70, 100, 10, 60, 100, 70],
      borderColor: 'green',
      borderWidth: 1,
      backgroundColor: 'green',
    },
  ],
};

export const optionsBarChart = {
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
      text: 'Bar chart title',
    },
  },
};
