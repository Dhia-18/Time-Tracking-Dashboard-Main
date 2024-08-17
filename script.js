const resultContainers = document.querySelectorAll(".card-container");

const dailyButton = document.getElementById("daily-button");
const weeklyButton = document.getElementById("weekly-button");
const monthlyButton = document.getElementById("monthly-button");

/* Connecting with the JSON file */

let data;
async function fetchData() {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
        data = await response.json();
        showResult("weekly", "Last Week"); /* Default Result */
    } catch (error) {
      console.error('Error:', error);
    }
}
fetchData();

function showResult(currentPeriod,previousPeriod){
    for(let i=0 ; i<resultContainers.length ; i++){
        const currentTime = resultContainers[i].querySelector(".current-time-spent");
        const previousTime = resultContainers[i].querySelector(".previous-time-spent");

        currentTime.textContent=`${data[i].timeframes[currentPeriod].current}hrs`;
        previousTime.textContent=`${previousPeriod} - ${data[i].timeframes[currentPeriod].previous}hrs`;
    }
}

dailyButton.addEventListener("click",(e)=>{
    e.preventDefault();

    showResult("daily","Yesterday");
});

weeklyButton.addEventListener("click",(e)=>{
    e.preventDefault();

    showResult("weekly","Last Week");
});

monthlyButton.addEventListener("click",(e)=>{
    e.preventDefault();

    showResult("monthly","Last Month")
});