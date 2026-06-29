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
}: {
  day: HeatmapDay | null;
  className?: string;
}) {
  return (
    <div
      className={clsx(styles[getDayColor(day ? day.count : -1)], className)}
    ></div>
  );
}
