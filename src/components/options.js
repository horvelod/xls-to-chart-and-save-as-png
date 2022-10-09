
export const options = {
    borderWidth: function(context) {
        const width = Math.round(context.chart.width);
        const size = width < 2000 ? 3 : 6;
  
        return size
      },
      scales: {
        y: {
          ticks: {
            font: function(context) {
              const width = context.chart.width;
              const size = Math.round(width / 64) < 12 ? 12 : Math.round(width / 64);
    
              return {
                  size: size
              };
            }
          }
        },
        x: {
          ticks: {
            font: function(context) {
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
            font: function(context) {
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
          text: 'title',
          font: function(context) {
            var width = context.chart.width;
            var size = Math.round(width / 64) < 12 ? 12 : Math.round(width / 64);
  
            return {
                weight: 'bold',
                size: size
            };
        }
        },
      },
}