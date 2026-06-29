import clsx from "clsx";
import type { HeatmapDay } from "../../entities/heatmap";
import styles from "./Day.module.scss";

function getDayColor(count: number): string {
  if (count === -1) return "disabled";
  if (count === 0) return "active--0";
  if (count <= 2) return "active--2";
  if (count <= 5) return "active--5";
  return "active--7";
}

export function Day({
  day,
  className,
  onClick,
}: {
  day: HeatmapDay | null;
  className?: string;
  onClick: () => void;
}) {
  const tooltipText = day?.count
    ? [
        day?.count,
        "contributions on",
        day.date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
        }),
      ].join(" ")
    : "No contribution";

  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div
        className={clsx(styles[getDayColor(day ? day.count : -1)], className)}
        aria-describedby={"tooltip-" + day?.date.toISOString()}
      ></div>
      <div id={"tooltip-" + day?.date.toISOString()} role="tooltip">
        {tooltipText}
      </div>
    </div>
  );
}
