import { GridValueGetterParams } from "@mui/x-data-grid";
import {
  fieldRow,
  ICreateColumnDataGrid,
  RowDataGrid,
  valueGetterName,
} from "../interfaces";

export class DataGridService {
  setColumns(
    field: string,
    headerName: string,
    width: number,
    description?: string,
    sortable: boolean = true,
    gettterName?: any
  ): ICreateColumnDataGrid {
    const column = {
      field,
      headerName,
      width,
      description: description || "",
      sortable: sortable,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    };

    return column;
  }

  
}
