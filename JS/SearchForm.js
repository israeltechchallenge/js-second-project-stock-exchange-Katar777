class SearchForm {
    constructor() {
      this.container = document.createElement("div");
      this.searchInput = document.createElement("input");
      this.searchBtn = document.createElement("button");
      this.ulForResults = document.createElement("ul");
      this.loadingSpinner = document.createElement("span");
  
      this.container.classList.add(
        "d-flex",
        "list-group-item",
        "justify-content-center",
        "align-items-center",
        "mainContainer"
      );
      this.searchInput.classList.add("search-input","w-50");
      this.searchInput.onkeyup = this.debounce(this.getDataFromServer,delay)
      this.searchBtn.classList.add("searchBtn","btn", "btn-secondary");
      this.ulForResults.classList.add("list-group", "list-group-flush");
      this.loadingSpinner.classList.add("spinner","spinner-border", "spinner-border-sm","d-none")
      
      this.searchBtn.textContent = "Search";
      this.searchBtn.addEventListener("click", this.getDataFromServer);
  
      this.container.append(this.searchInput);
      this.container.append(this.searchBtn);
      this.container.append(this.loadingSpinner);
  
      document.body.appendChild(this.container);
      document.body.appendChild(this.ulForResults);
    }
  
    getDataFromServer = async () => {
      this.erase()
      let usersInput = this.searchInput.value;
      let UrlForFetch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${usersInput}&limit=11&exchange=NASDAQ`;
  
      if (usersInput == "") {
        alert("Type in your request!");
      } else {
        this.showSpinner()
        try {
          const response = await fetch(UrlForFetch);
          if (!response.ok) {
            alert("Something went bad, try again later");
          }
          const data = await response.json();
        for (const company of data) {
          const {symbol} = company;
          this.getAdditionalDataFromServer(symbol);
        }
          return data;
        } catch (err) {
          console.error(err);
        }
      }
    }



  
     getAdditionalDataFromServer = async(symbol) => {
      try {
        const response = await fetch(baseURL + `company/profile/${symbol}`);
        const addedData = await response.json();
        this.displaySearchResultInHtml(addedData)
      } catch (error) {
        console.log(error);
      }
    }
  
    displaySearchResultInHtml = (addedData) => {
      const {companyName, image, changesPercentage} = addedData.profile;
      const symbol = addedData.symbol;
      const newItem = document.createElement("li");
      newItem.classList.add("list-group-item","d-flex",
      "align-items-center");
    
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
        changesInPercentages.innerHTML = `${this.convertToPercentages(changesPercentage)}`;
        changesInPercentages.classList.add("red");
      } else {
        changesInPercentages.innerHTML = `+${this.convertToPercentages(changesPercentage)}`;
        changesInPercentages.classList.add("green");
      }
    
      link.innerHTML = companyName;
    
      newItem.append(companyLogo, link, `(${addedData.symbol})`, changesInPercentages);
      this.ulForResults.appendChild(newItem); 
      console.log(this.ulForResults.innerHTML)
      console.log(this.searchInput.value)
      this.hideSpinner();
      this.highlightBackground();
    }

    highlightBackground=()=> {

      let searchText = this.searchInput.value;
      let text = this.ulForResults.innerHTML;
      const regex = new RegExp(`(?<=\\>|\\()${searchText}`, "gi");
      const outputString = `${text.replace(regex, (match) => `<span class="yellow">${match}</span>`)}`;
      this.ulForResults.innerHTML = `${outputString}`

  };
   

    debounce=(func, delay = 200) =>{
      let timerId
      return function () {
          clearTimeout(timerId)
          timerId = setTimeout(() => {
              func()
          }, delay)
      }
  }
  
    showSpinner = () => {
      this.loadingSpinner.classList.remove("d-none");
    }
    
    hideSpinner = () => {
      this.loadingSpinner.classList.add("d-none");
    }
  
    erase = () => {
      this.ulForResults.innerHTML = "";
    };
  
    convertToPercentages(number) {
      return Number(number).toFixed(2) + "%"
    }
  }
  
    let form = new SearchForm();