import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const renderActionsCell = (params: any) => {
  return (
    <>
      <IconButton onClick={() => params.api.gridOptions.handleEdit(params.row)} color="default">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => params.api.gridOptions.handleDelete(params.id)} color="default">
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value: number, row: {firstName: string, lastName: string}) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: renderActionsCell, // Use the renderActionsCell function here
  },
];
