import { Chart, Title } from "@highcharts/react";
import { useRef } from "react";
import * as Highcharts from "highcharts";
import "highcharts/modules/sankey";
import styles from "./App.module.css";
import conf from "./config.json";

const TOTAL_APPLIED = conf["Applied"];
const TOTAL_SCREENING = conf["Screening"];
const TOTAL_TECH_INTERVIEW = conf["Tech-interview"];
const TOTAL_REFUSED = conf["Refused"];

const options = {
  title: {
    text: "Job search results",
  },
  accessibility: {
    point: {
      valueDescriptionFormat:
        "{index}. {point.from} to {point.to}, " + "{point.weight}.",
    },
  },
  tooltip: {
    headerFormat: null,
    pointFormat:
      "{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight:.2f} " +
      "quads",
    nodeFormat: "{point.name}: {point.sum:.2f} quads",
  },
  series: [
    {
      keys: ["from", "to", "weight"],

      nodes: [
        {
          id: "Applied",
        },
        {
          id: "Screening",
          offset: 120,
        },
        {
          id: "Tech-interview",
          offset: 125,
        },
        {
          id: "Refused",
          column: 3,
        },
        { id: "Rejected", column: 3 },
        { id: "Ghosted" },
      ],

      data: [
        ["Applied", "Rejected", TOTAL_APPLIED - TOTAL_SCREENING],
        ["Screening", "Rejected", TOTAL_SCREENING - TOTAL_TECH_INTERVIEW - TOTAL_REFUSED],
        ["Tech-interview", "Rejected", TOTAL_TECH_INTERVIEW],

        ["Screening", "Tech-interview", TOTAL_TECH_INTERVIEW],

        ["Screening", "Refused", TOTAL_REFUSED],

        ["Applied", "Screening", TOTAL_SCREENING],
      ],
      type: "sankey",
    },
  ],
};

export function App() {
  const chartComponentRef = useRef(null);

  const customLabels = [];

  return (
    <div className={styles.app}>
      <Chart highcharts={Highcharts} options={options} ref={chartComponentRef}>
        <Title>{options.title.text}</Title>
      </Chart>
      {customLabels}
    </div>
  );
}

export default App;
