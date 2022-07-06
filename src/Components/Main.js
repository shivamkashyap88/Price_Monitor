import "./../styles.css";
import React from "react";
import SearchC from "./Search";
import { IgrFinancialChartModule } from "igniteui-react-charts";

IgrFinancialChartModule.register();
export default function Main() {
  return (
    <>
      <div className="App">
        <h1>Security Price Monitor</h1>
      </div>
      <section>
        <SearchC />
      </section>
    </>
  );
}
