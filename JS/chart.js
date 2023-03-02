

async function getHistoricalData() {
  const response = await fetch(companyStockHistory);
  const data = await response.json();
  length = data.historical.length;


  labels = [];
  values = [];
  for (i = 0; i < length; i++) {
    labels.push(data.historical[i].date);
    values.push(data.historical[i].close);
  }

  new Chart(document.getElementById("bar-chart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Close",
          data: values,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Stock Price Historical Data",
      },
    },
  });
}

getHistoricalData();