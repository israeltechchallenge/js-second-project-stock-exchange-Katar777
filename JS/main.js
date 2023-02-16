const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const resultList = document.getElementById("resultList");
const baseURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`;
const baseLinkToCompany = `/HTML_PAGES/company.html?symbol=`;
const loadingSpinner = document.getElementById("loadingSpinner");

getDataFromServer = async () => {
  erase();
  showSpinner();
  let usersInput = searchBar.value;
  let UrlForFetch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/searc
h?query=${usersInput}&limit=11&exchange=NASDAQ`;

  if (usersInput == "") {
    alert("Type in your request!");
  } else {
    try {
      const response = await fetch(UrlForFetch);
      if (!response.ok) {
        alert("Something went bad");
      }
      const data = await response.json();
      for (const company of data) {
        const { symbol } = company;
        getAdditionalDataFromServer(symbol);
      }
    } catch (err) {
      console.error(err);
    }
  }
};

async function getAdditionalDataFromServer(symbol) {
  try {
    const response = await fetch(baseURL + `company/profile/${symbol}`);
    const addedData = await response.json();
    console.log(addedData);
    generateResultList(addedData);
  } catch (error) {
    console.log(error);
  }
}

generateResultList = (addedData) => {
  const { companyName, image, changesPercentage } = addedData.profile;
  const symbol = addedData.symbol;

  const newItem = document.createElement("li");
  newItem.classList.add("list-group-item");

  const companyLogo = document.createElement("img");
  companyLogo.setAttribute("src", `${image}`);
  companyLogo.classList.add("small");

  const link = document.createElement("a");
  link.href = `${baseLinkToCompany}${symbol}`;

  const changesInPercentages = document.createElement("p");

  changesInPercentages.innerHTML = `(${changesPercentage})`;

  const companySymbol = document.createElement("p");
  companySymbol.innerHTML = `${symbol}`;

  if (changesPercentage < 0) {
    changesInPercentages.innerHTML = `${changesPercentage}%`;
    changesInPercentages.classList.add("red");
  } else {
    changesInPercentages.innerHTML = `+${changesPercentage}%`;
    changesInPercentages.classList.add("green");
  }

  link.innerHTML = `${companyName} (${symbol})`;

  newItem.append(companyLogo, link, companySymbol, changesInPercentages);

  resultsList.appendChild(newItem);
  hideSpinner();
};

showSpinner = () => {
  loadingSpinner.classList.remove("d-none");
};

hideSpinner = () => {
  loadingSpinner.classList.add("d-none");
};

const erase = () => {
  document.getElementById("resultsList").innerHTML = "";
};

searchBtn.onclick = getDataFromServer;
