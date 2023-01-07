export type valueGetterName = {
  name1: string;
  name2: string;
};

export type fieldRow = [
  {
    title: string;
    value: string | number;
  }
];

export interface RowDataGrid {
  id: number;
  field: fieldRow;
}
