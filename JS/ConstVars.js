const urlParams = new URLSearchParams(window.location.search);
const companySymbol = urlParams.get("symbol");
const baseURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`;
const companyURL = `${baseURL}company/profile/${companySymbol}`;
const companyData = document.getElementById("company-data");
const baseLinkToCompany = `/HTML_PAGES/company.html?symbol=`;
const companyStockHistory = baseURL + `historical-price-full/${companySymbol}?serietype=line`;