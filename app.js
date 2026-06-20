const API_URL =
  "https://humandesign.phattharapol-sur.workers.dev/";

const form = document.getElementById("chartForm");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  result.classList.add("hidden");

  loading.classList.remove("hidden");

  const date =
    document.getElementById("birthDate").value;

  const time =
    document.getElementById("birthTime").value;

  const datetime =
    `${date}T${time}+07:00`;

  try {

    const response = await fetch(API_URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        datetime,
        verbose:true
      })
    });

    const data = await response.json();

    renderChart(data);

  } catch(err){

    result.innerHTML =
      `<div class="card">
        Error: ${err.message}
      </div>`;

    result.classList.remove("hidden");

  } finally {

    loading.classList.add("hidden");

  }

});

function renderChart(data){

  result.innerHTML = `
  <div class="card">

    <h2>${data.type || "-"}</h2>

    <div class="grid">

      <div>
        <strong>Profile</strong><br>
        ${data.profile || "-"}
      </div>

      <div>
        <strong>Authority</strong><br>
        ${data.authority || "-"}
      </div>

      <div>
        <strong>Strategy</strong><br>
        ${data.strategy || "-"}
      </div>

      <div>
        <strong>Definition</strong><br>
        ${data.definition || "-"}
      </div>

    </div>

  </div>
  `;

  result.classList.remove("hidden");
}
