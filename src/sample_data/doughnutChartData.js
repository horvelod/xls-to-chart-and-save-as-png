
export const dataDoughnutChart = {
  labelsHead: 'Companies',
  labels: ['Company 1', 'Company 2', 'Company 3', 'Company 4'],
  datasets: [
    {
      label: 'Data',
      data: [10, 60, 80, 50],
      backgroundColor: ['red', 'blue', 'yellow', 'green'],
      hoverOffset: 4
    },
  ],
};

export const optionsDoughnutChart = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 6,
      }
    },
    title: {
      display: true,
      text: 'Doughnut chart title',
    },
  },
};
