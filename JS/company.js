const urlParams = new URLSearchParams(window.location.search);
const companySymbol = urlParams.get("symbol");
const baseURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`;
const companyURL = `${baseURL}company/profile/${companySymbol}`;
const companyData = document.getElementById("company-data");

async function getCompanyData() {
  try {
    const response = await fetch(companyURL);
    const data = await response.json();
    console.log(data.profile.image)
    showCompanyData(data);
  } catch (error) {
    console.log(error);
  }
}


showCompanyData = (data) => {
  const {
    address,
    companyName,
    city,
    state,
    country,
    image,
    website,
    price,
    description,
    range,
    changes,
    changesPercentage,
    currency,
    ceo,
  } = data.profile;

  const companyItem = document.createElement("div");
  companyItem.innerHTML = `
        <h2 class="company-name">${companyName}</h2>        
        <div class = "company-profile">
            <div class="Short-profile">
                <p><span>Stock Price:</span> ${price} ${currency}</p>
                <p><span>Range:</span> ${range} ${currency}</p>
                <p class="price-changes"><span>Changes:</span> ${changes} (<b id="changesPercentage">${changesPercentage}%</b>)</p>
            </div>
            <div class="company-logo">
                <img src="${image}" alt="${companyName}"/>
            </div>
        </div>
        <div class="Main-section">
            <p id="CEO"><span>CEO:   </span>${ceo}</p>
            <p><span>Description:<br></span> ${description}</p>       
            <p>Address: ${address}, ${city}, ${state}, ${country}</p>
            <br>
            <p>Official website: <a href="${website}">${website}</a></p>
        </div>
      `;
  companyData.appendChild(companyItem);

  if (changes >= 0) {
    getElGreen();
  } else {
    getElRed();
  }
};

getElRed = () => {
  document.getElementById("changesPercentage").style.color = "red";
};

getElGreen = () => {
  document.getElementById("changesPercentage").style.color = "lightgreen";
};

getCompanyData();
