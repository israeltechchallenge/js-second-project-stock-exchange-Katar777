let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let resultList = document.getElementById("resultList");
let baseLinkToCompany = `/HTML_PAGES/company.html?symbol=`;
let loadingSpinner = document.getElementById("loadingSpinner");


getLast10Results = async () => {
  let usersInput = searchBar.value;
  let UrlForFetch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/searc
h?query=${usersInput}&limit=10&exchange=NASDAQ`;

  if ((usersInput == "")) {
    alert("Type in your request!")
  } else {
    try {
      const response = await fetch(UrlForFetch);
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      generateResultList(data);
    } catch (err) {
      console.error(err);
    }
  }
};

generateResultList = (resultArray) => {
  resultsList.innerHTML = "";

  for (const data of resultArray) {
    const { name, symbol} = data;
    const newItem = document.createElement("li");
    newItem.classList.add("list-group-item");
    const link = document.createElement("a");
    link.href = `${baseLinkToCompany}${symbol}`;
    newItem.append(link);
    link.innerHTML = `${name} (${symbol})`;
    resultsList.appendChild(newItem);
  }
};

showSpinner = () => {
  loadingSpinner.classList.remove("d-none");
};

hideSpinner = () => {
  loadingSpinner.classList.add("d-none");
};


searchBtn.onclick = getLast10Results;


