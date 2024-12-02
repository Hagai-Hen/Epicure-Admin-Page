import { DashboardContainer } from "./styles";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { columns, renderActionsCell } from './columns';  // Import the columns configuration

interface SideBarProps {
  data: string[];
}

interface RowData {
    id: number;
    firstName: string;
    lastName: string;
    age: number | null;
  }

const initialRows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "fas", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const Dashboard = ({ data }: SideBarProps) => {
  const [rowsData, setRowsData] = useState<RowData[]>(initialRows);
  const [editingRow, setEditingRow] = useState<any>(null); // Row being edited
  const [editedRowData, setEditedRowData] = useState<any>({}); // Data of the row being edited
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Open confirmation dialog for delete
  const [rowToDelete, setRowToDelete] = useState<any>(null); // Row to be deleted
  const paginationModel = { page: 0, pageSize: 5 };

  // Handle row deletion
  const handleDelete = (id: number) => {
    const row = rowsData.find((row) => row.id === id);
    setRowToDelete(row); // Store the row to delete
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  // Confirm the deletion
  const confirmDelete = () => {
    if (rowToDelete) {
      setRowsData((prevRows) => prevRows.filter((row) => row.id !== rowToDelete.id)); // Delete the row
      setRowToDelete(null); // Clear the row to delete
    }
    setOpenDeleteDialog(false); // Close the confirmation dialog
  };

  // Cancel the deletion
  const cancelDelete = () => {
    setRowToDelete(null); // Clear the row to delete
    setOpenDeleteDialog(false); // Close the confirmation dialog
  };

  // Handle row edit
  const handleEdit = (row: RowData[]) => {
    setEditingRow(row); // Set the row to be edited
    setEditedRowData({ ...row }); // Set the row data to the state to allow editing
  };

  // Handle change in input fields
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRowData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Save the edited data
  const handleSaveEdit = () => {
    const updatedRows = rowsData.map((row) =>
      row.id === editingRow.id ? { ...row, ...editedRowData } : row
    );
    setRowsData(updatedRows);
    setEditingRow(null); // Close the dialog
  };

  // Cancel editing (close the dialog without saving)
  const handleCancelEdit = () => {
    setEditingRow(null); // Close the dialog
  };

  const gridOptions = {
    handleEdit,
    handleDelete,
  };

  const updatedColumns = columns.map((col) => {
    if (col.field === "actions") {
      // Override the renderCell for the "actions" column to render edit and delete buttons
      return {
        ...col,
        renderCell: (params: any) =>
          renderActionsCell({ ...params, api: { gridOptions } }),
      };
    }
    return col;
  });

  return (
    <>
      <DashboardContainer>
        <Paper sx={{ height: 400, width: "80%" }}>
          <DataGrid
            rows={rowsData}
            columns={updatedColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </DashboardContainer>

      {/* Edit Dialog */}
      <Dialog open={editingRow !== null} onClose={handleCancelEdit}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={editedRowData?.firstName || ""}
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editedRowData?.lastName || ""}
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={editedRowData?.age || ""}
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <p>Once deleted, this action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
