export class HeatmapDay {
  date: Date;
  actions: string[];
  test: string;

  public get count(): number {
    return this.actions.length;
  }

  constructor(date: string, actions: string[], test?: string) {
    this.date = new Date(date);
    this.actions = actions;
    this.test = test ?? "";
  }
}

export type GridCell = HeatmapDay | null;
export type WeekColumn = GridCell[];
