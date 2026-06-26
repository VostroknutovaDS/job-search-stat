export class HeatmapDay {
  date: Date;
  actions: string[];

  public get count(): number {
    return this.actions.length;
  }
}

export type GridCell = HeatmapDay | null;
export type WeekColumn = GridCell[];
