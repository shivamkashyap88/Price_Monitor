import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import Main from "./Components/Main";
import { IgrFinancialChartModule } from "igniteui-react-charts";

IgrFinancialChartModule.register();

ReactDOM.render(<Main />, document.getElementById("root"));
