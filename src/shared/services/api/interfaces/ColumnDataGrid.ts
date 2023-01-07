export interface ICreateColumnDataGrid {
  field: string;
  headerName: string;
  width: number;
  description?: string;
  sortable?: boolean;
  getterName?: any;
}
