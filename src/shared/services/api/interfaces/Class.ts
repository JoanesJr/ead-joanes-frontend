export interface IClass {
  id: number;
  title: string;
  description: string;
  sectionId: number;
  active: boolean;
  class: IClassSection[];
}

export interface IClassSection {
  id: number;
  title: string;
  active: boolean;
  file?: string;
}