class SearchResult {
  getCompanyData = async () => {
    try {
      const response = await fetch(companyURL);
      const data = await response.json();
      console.log(data);
      this.showCompanyData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <p class="price-changes"><span>Changes:</span> ${changes} (<b id="changesPercentage">${this.leave2DigitsAfterDot(
      changesPercentage
    )}</b>)</p>
              </div>
              <div class="company-logo">
                  <img src="${image}" alt="${companyName}"/>
              </div>
          </div>
          <div class="Main-section">
              <p id="CEO"><span>CEO:   </span>${ceo}</p>
              <p><span>Description:<br></span> ${description}</p>       
              <p><span>Address:</span> ${address}, ${city}, ${state}, ${country}</p>
              <br>
              <p><span>Official website:</span> <a href="${website}">${website}</a></p>
              <br>
          </div>
        `;
    companyData.appendChild(companyItem);

    if (changes >= 0) {
      this.getElGreen();
    } else {
      this.getElRed();
    }
  };

  getElRed = () => {
    document.getElementById("changesPercentage").style.color = "red";
  };

  getElGreen = () => {
    document.getElementById("changesPercentage").style.color = "lightgreen";
  };

  leave2DigitsAfterDot(number) {
    return Number(number).toFixed(2) + "%";
  }
}

let result = new SearchResult();
result.getCompanyData();
