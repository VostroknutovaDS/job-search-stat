import { HeatmapDay, type WeekColumn } from "../../entities/heatmap";

export function buildGrid(data: HeatmapDay[]): WeekColumn[] {
  const grid: WeekColumn[] = [];

  const map = new Map(data.map((d) => [d.date.toISOString().slice(0, 10), d]));

  const end = new Date();
  const start = new Date();
  start.setFullYear(end.getFullYear() - 1);
  let week: (HeatmapDay | null)[] = Array(start.getDay()).fill(null);
  start.setDate(start.getDate() + 1);

  for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
    week.push(
      new HeatmapDay(
        i.toISOString().slice(0, 10),
        (map.get(i.toISOString().slice(0, 10)) as HeatmapDay)?.actions ?? [],
      ),
    );
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    week = week.concat(Array(7 - end.getDay()).fill(null));
    grid.push(week);
  }

  return grid;
}
