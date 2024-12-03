import {
  CustomPaper,
  DashboardBackContainer,
  DashboardBackIcon,
  DashboardContainer,
  DashboardCreateButton,
  DashboardHeaderBack,
  DashboardHeaderContainer,
  DashboardHeaderEntries,
  DashboardHeaderTitle,
  DashboardLeftHeader,
  DashboardRightHeader,
} from "./styles";
import { useState, useEffect, useMemo, useCallback } from "react";
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
import { renderActionsCell } from "./columns";
import { DASHBOARD } from "../../resources/content";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";

interface Column extends Omit<GridColDef, "renderCell"> {
  renderCell?: (params: any) => JSX.Element;
}

interface SideBarProps {
  data: RowData[];
  setActivePage: (page: string) => void;
  columnData: Column[];
}

interface RowData {
  id: string;
}

export const Dashboard = ({
  data,
  setActivePage,
  columnData,
}: SideBarProps) => {
  const [rowsData, setRowsData] = useState<RowData[]>(data);
  const [editingRow, setEditingRow] = useState<RowData | null>(null);
  const [editedRowData, setEditedRowData] = useState<RowData | any>({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<RowData | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditFormValid, setIsEditFormValid] = useState(true);
  const paginationModel = { page: 0, pageSize: 5 };
  const navigate = useNavigate();

  const { collection } = useParams<{ collection: string }>();
  let displayName = "";
  if (collection)
    displayName = collection.charAt(0).toUpperCase() + collection.slice(1);

  const newRowDataInitial = useMemo(() => {
    return columnData.reduce((acc: any, col: Column) => {
      if (col.field !== "actions") {
        acc[col.field] = "";
      }
      return acc;
    }, {});
  }, [columnData]);
  const [newRowData, setNewRowData] = useState<any>(newRowDataInitial);

  useEffect(() => {
    setActivePage(collection || "");
    setRowsData(data);
  }, [collection]);

  const handleCreateDialogOpen = useCallback(() => {
    setOpenCreateDialog(true);
  }, []);

  const handleCreateFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedRowData = { ...newRowData, [name]: value };
      setNewRowData(updatedRowData);

      const isValid = Object.values(updatedRowData).every((val) => val !== "");
      setIsFormValid(isValid);
    },
    [newRowData]
  );

  const handleSaveCreate = useCallback(() => {
    const newRow = { id: `${rowsData.length + 1}`, ...newRowData };
    setRowsData((prevRows) => [...prevRows, newRow]);
    setNewRowData({});
    setOpenCreateDialog(false);
  }, [rowsData, newRowData]);

  const handleCancelCreate = useCallback(() => {
    setNewRowData({});
    setOpenCreateDialog(false);
    setIsFormValid(false);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      const row = rowsData.find((row) => row.id === id);
      if (row) setRowToDelete(row);
      setOpenDeleteDialog(true);
    },
    [rowsData]
  );

  const confirmDelete = useCallback(() => {
    if (rowToDelete) {
      setRowsData((prevRows) =>
        prevRows.filter((row) => row.id !== rowToDelete.id)
      );
      setRowToDelete(null);
    }
    setOpenDeleteDialog(false);
  }, [rowToDelete]);

  const cancelDelete = useCallback(() => {
    setRowToDelete(null);
    setOpenDeleteDialog(false);
  }, []);

  const handleEdit = useCallback((row: RowData) => {
    setEditingRow(row);
    setEditedRowData({ ...row });
  }, []);

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedRowData((prev: any) => {
        const updated = { ...prev, [name]: value };

        const isValid = Object.values(updated).every((val) => val !== "");
        setIsEditFormValid(isValid);
        return updated;
      });
    },
    []
  );

  const handleSaveEdit = useCallback(() => {
    const updatedRows = rowsData.map((row) =>
      row.id === editingRow?.id ? { ...row, ...editedRowData } : row
    );
    setRowsData(updatedRows);
    setEditingRow(null);
  }, [rowsData, editingRow, editedRowData]);

  const handleCancelEdit = useCallback(() => {
    setEditingRow(null);
  }, []);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const updatedColumns = columnData.map((col) => {
    if (col.field === "actions") {
      return {
        ...col,
        renderCell: (params: any) =>
          renderActionsCell({ ...params, api: { gridOptions } }),
      };
    }
    return col;
  });

  const gridOptions = {
    handleEdit,
    handleDelete,
  };

  return (
    <>
      <DashboardContainer>
        <DashboardHeaderContainer>
          <DashboardLeftHeader>
            <DashboardBackContainer onClick={handleBackClick}>
              <DashboardBackIcon />
              <DashboardHeaderBack>{DASHBOARD.HEADER.BACK}</DashboardHeaderBack>
            </DashboardBackContainer>
            <DashboardHeaderTitle>{displayName}</DashboardHeaderTitle>
            <DashboardHeaderEntries>
              {data.length} {DASHBOARD.HEADER.ENTRIES}
            </DashboardHeaderEntries>
          </DashboardLeftHeader>
          <DashboardRightHeader>
            <DashboardCreateButton onClick={handleCreateDialogOpen}>
              {DASHBOARD.HEADER.CREATE_BUTTON}
            </DashboardCreateButton>
          </DashboardRightHeader>
        </DashboardHeaderContainer>
        <CustomPaper>
          <DataGrid
            rows={rowsData}
            columns={updatedColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </CustomPaper>
      </DashboardContainer>

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCancelCreate}>
        <DialogTitle>{DASHBOARD.CREATE_DIALOG.TITLE}</DialogTitle>
        <DialogContent>
          {columnData?.map((col: any) => {
            const { field, headerName, type } = col;
            if (field === "actions") return null;
            const value = newRowData[field] || "";

            return (
              <TextField
                key={field}
                label={headerName}
                name={field}
                type={type || "text"}
                value={value}
                onChange={handleCreateFieldChange}
                fullWidth
                margin="normal"
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCreate} color="primary">
            {DASHBOARD.CREATE_DIALOG.CANCEL}
          </Button>
          <Button
            onClick={handleSaveCreate}
            color="primary"
            disabled={!isFormValid}
          >
            {DASHBOARD.CREATE_DIALOG.CREATE}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editingRow !== null} onClose={handleCancelEdit}>
        <DialogTitle>{DASHBOARD.EDIT_DIALOG.TITLE}</DialogTitle>
        <DialogContent>
          {columnData?.map((col: any) => {
            const { field, headerName, type } = col;
            if (field === "actions") return null;
            const value = editedRowData[field] || "";

            return (
              <TextField
                key={field}
                label={headerName}
                name={field}
                type={type || "text"}
                value={value}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            {DASHBOARD.EDIT_DIALOG.CANCEL}
          </Button>
          <Button
            onClick={handleSaveEdit}
            color="primary"
            disabled={!isEditFormValid}
          >
            {DASHBOARD.EDIT_DIALOG.SAVE}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>{DASHBOARD.DELETE_DIALOG.TITLE}</DialogTitle>
        <DialogContent>
          <p>{DASHBOARD.DELETE_DIALOG.BODY}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            {DASHBOARD.DELETE_DIALOG.CANCEL}
          </Button>
          <Button onClick={confirmDelete} color="secondary" variant="contained">
            {DASHBOARD.DELETE_DIALOG.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
