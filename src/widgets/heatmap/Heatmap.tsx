import { HeatmapDay } from "../../entities/heatmap";
import { buildGrid } from "./buildGrid";
import { Day } from "./Day";
import styles from "./Heatmap.module.scss";
import records from "../../records.json";
import clsx from "clsx";

export function Heatmap() {
  const heatmap: HeatmapDay[] = records.records.map(
    (record) => new HeatmapDay(record.date, record.actions),
  );
  const weekdays = ["Mon", "Wed", "Fri", "Sun"];
  console.log(heatmap);

  const grid = buildGrid(heatmap);
  return (
    <div className={styles.grid}>
      <div className={clsx(styles.week, styles.weekdays)}>
        {weekdays.map((weekday) => (
          <span className={styles.weekday}>{weekday}</span>
        ))}
      </div>
      {grid.map((week, i) => (
        <div key={i} className={styles.week}>
          {week.map((day, j) => (
            <Day key={j} day={day} className={styles.day as string}></Day>
          ))}
        </div>
      ))}
    </div>
  );
}
