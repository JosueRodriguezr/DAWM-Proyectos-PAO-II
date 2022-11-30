var ctx = document.getElementById("myChart");
var ctx2 = document.getElementById("myChart2");
function peticion(latitude, longitude){
  const context = ctx.getContext('2d');
  context.clearRect(0, 0, ctx.width, ctx.height);
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m`)
  .then((response) => response.json())
  .then((data) =>{
    horas = data.hourly.time;
    temperatura = data.hourly.temperature_2m;
    viento = data.hourly.windspeed_10m;
    console.log(data.hourly);
    crearGrafico(ctx,horas,temperatura);
    crearGrafico(ctx2,horas,viento);
  });
}

peticion(-2.20,-79.89);

function crearGrafico(base, equis, ye){
  new Chart(base, {
    type: "line",
    data: {
      type:"datetime",
      labels: equis,
      datasets: [
        {
          data: ye,
          lineTension: 1,
          backgroundColor: "transparent",
          borderColor: "#007bff",
          borderWidth: 4,
          pointBackgroundColor: "#007bff",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
}