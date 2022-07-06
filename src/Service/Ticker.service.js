export default function useTickerService() {
  const API_KEY = "RY0Y23GWKYXXOUBM";
  const API_URL = "https://www.alphavantage.co/query";
  class StockItem {
    constructor() {
      this.open = 0;
      this.close = 0;
      this.low = 0;
      this.high = 0;
      this.date = new Date();
    }
  }
  const getTickerSymbol = async (symbol) => {
    const url = `${API_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    let response = await fetch(url);
    let jsonData = await response.json();
    let stockData = convertData(jsonData);
    stockData.__dataIntents = {
      close: [`SeriesTitle/${symbol}`]
    };
    return new Promise((resolve, reject) => {
      resolve(stockData);
    });
  };

  const getSymbolSearch = async (keyword) => {
    const url = `${API_URL}?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const keywordResponse = await response.json();
    const result = [];
    for (let matches of keywordResponse["bestMatches"]) {
      result.push({
        title: matches["1. symbol"],
        description: matches["2. name"]
      });
    }
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  };

  const convertData = (jsonData) => {
    let stockItems = [];
    let stocks = Object.keys(jsonData)[1];
    for (let key in jsonData[stocks]) {
      let item = new StockItem();
      item.date = new Date(key);
      item.open = +jsonData[stocks][key]["1. open"];
      item.high = +jsonData[stocks][key]["2. high"];
      item.low = +jsonData[stocks][key]["3. low"];
      item.close = +jsonData[stocks][key]["4. close"];
      item.volume = +jsonData[stocks][key]["5. volume"];
      stockItems.push(item);
    }
    return stockItems;
  };

  return {
    getTickerSymbol,
    getSymbolSearch
  };
}
