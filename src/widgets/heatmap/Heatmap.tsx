import { Day } from "./Day";

export function Heatmap() {
  const heatmap = Array.from({ length: 16 });
  return (
    <div>
      {heatmap.map(() => (
        <Day></Day>
      ))}
    </div>
  );
}
