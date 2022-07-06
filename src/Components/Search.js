import { useReducer, useState, useEffect } from "react";
import React from "react";
import useTickerService from "./../Service/Ticker.service";
import { Search } from "semantic-ui-react";
import Chart from "./Chart";

export default function SearchC() {
  const tickerService = useTickerService();
  const [chartData, setChartData] = useState({ data: [] });
  const initialState = {
    loading: false,
    results: [],
    value: ""
  };
  const searchKeyword = (state, action) => {
    tickerService.getSymbolSearch(action.query).then((value) => {
      dispatch({
        type: "FINISH_SEARCH",
        results: value
      });
    });
  };
  const searchReducer = (state, action) => {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState;
      case "START_SEARCH":
        searchKeyword(state, action);
        return { ...state, loading: true, value: action.query };
      case "FINISH_SEARCH":
        return { ...state, loading: false, results: action.results };
      case "UPDATE_SELECTION":
        return { ...state, value: action.selection };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();

  const searchTicker = (symbol) => {
    tickerService.getTickerSymbol(symbol).then((stocks) => {
      setChartData({ data: stocks });
    });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }
      dispatch({ type: "START_SEARCH", query: data.value });
    }, 300);
  }, []);

  return (
    <>
      <article className="search-placeholder">
        <Search
          loading={loading}
          placeholder="Search..."
          onResultSelect={(e, data) => {
            searchTicker(data.result.title);
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title
            });
          }}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </article>
      <section style={{ height: "100vh" }}>
        {chartData.data.length > 0 && <Chart data={chartData.data} />}
      </section>
    </>
  );
}
