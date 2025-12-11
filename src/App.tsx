import { Chart, Title } from "@highcharts/react";
import { useRef, useState } from "react";
import * as Highcharts from "highcharts";
import "highcharts/modules/sankey";
import styles from "./App.module.css";
import conf from "./config.json";
import Form from "./widgets/form/Form";
import type { Statistics } from "./entities/statistics";
import type { State } from "./entities/state";

const TOTAL_APPLIED = conf["Applied"];
const TOTAL_SCREENING = conf["Screening"];
const TOTAL_TECH_INTERVIEW = conf["Tech-interview"];
const TOTAL_REFUSED = conf["Refused"];

export function App() {
  const [applicationState, setApplicationState] = useState<Statistics>({
    Applied: TOTAL_APPLIED,
    Screening: TOTAL_SCREENING,
    TechInterview: TOTAL_TECH_INTERVIEW,
    Refused: TOTAL_REFUSED,
  });

  const handleApplicationStateChange = (newState: State) => {
  setApplicationState((prev) => ({
    ...prev,
    ...newState,
  }));
};

  const chartComponentRef = useRef(null);

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
      headerFormat: "",
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
          [
            "Applied",
            "Rejected",
            applicationState.Applied - applicationState.Screening,
          ],
          [
            "Screening",
            "Rejected",
            applicationState.Screening -
              applicationState.TechInterview -
              applicationState.Refused,
          ],
          ["Tech-interview", "Rejected", applicationState.TechInterview],

          ["Screening", "Tech-interview", applicationState.TechInterview],

          ["Screening", "Refused", applicationState.Refused],

          ["Applied", "Screening", applicationState.Screening],
        ],
        type: "sankey" as const,
      },
    ],
  };

  return (
    <div className={styles.app}>
      <Chart highcharts={Highcharts} options={options} ref={chartComponentRef}>
        <Title>{options.title.text}</Title>
      </Chart>
      <Form onApplicationStateChange={handleApplicationStateChange}></Form>
    </div>
  );
}

export default App;
