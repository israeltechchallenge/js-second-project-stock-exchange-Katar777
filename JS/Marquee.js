class Marquee {
  constructor(element) {
    this.element = element;
    this.data;
    this.container;
    this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse?exchange=NASDAQ`;
  }

  getData = async () => {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (eror) {
      showError(eror);
    }
  };

  setMarqueeData = async () => {
    let container = document.createElement("div");
    container.className = "marquee";
    container.id = "marquee_container";
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 10; i++) {
        let marqueePrice = document.createElement("div");
        marqueePrice.className = "marquee-price";
        let marqueeSymbol = document.createElement("div");
        marqueeSymbol.className = "marquee-name";
        const symbol = this.data[i].symbol;
        const price = `${this.data[i].price}$`;
        marqueeSymbol.innerHTML = symbol;
        marqueePrice.innerHTML = price;
        marqueePrice.classList.add("green");
        container.appendChild(marqueeSymbol);
        container.appendChild(marqueePrice);
      }
    }
    this.container = container;
  };
  displayMarqueeData = async () => {
    let marqueeContainer = this.element;
    marqueeContainer.appendChild(this.container);
  };
  load = async () => {
    this.data = await this.getData();
    this.setMarqueeData();
    this.displayMarqueeData();
  };
}
