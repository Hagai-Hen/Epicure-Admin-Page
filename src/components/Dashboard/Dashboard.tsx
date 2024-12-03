import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { renderActionsCell } from "./columns";
import { DASHBOARD } from "../../resources/content";
import CreateDialog from "../Dialogs/CreateDialog";
import EditDialog from "../Dialogs/EditDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import { GridColDef } from "@mui/x-data-grid";
import { CustomPaper, DashboardContainer, DashboardCreateButton, DashboardHeaderContainer, DashboardLeftHeader, DashboardRightHeader, DashboardHeaderTitle, DashboardBackContainer, DashboardBackIcon, DashboardHeaderBack, DashboardHeaderEntries } from "./styles";

interface Column extends Omit<GridColDef, "renderCell"> {
  renderCell?: (params: any) => JSX.Element;
}

interface RowData {
  id: string;
}

interface SideBarProps {
  data: RowData[];
  setActivePage: (page: string) => void;
  columnData: Column[];
}

export const Dashboard: React.FC<SideBarProps> = ({ data, setActivePage, columnData }) => {
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
  if (collection) displayName = collection.charAt(0).toUpperCase() + collection.slice(1);

  const newRowDataInitial = useMemo(() => {
    return columnData.reduce((acc: any, col: Column) => {
      if (col.field !== "actions") acc[col.field] = "";
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

  const handleCreateFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRowData = { ...newRowData, [name]: value };
    setNewRowData(updatedRowData);
    const isValid = Object.values(updatedRowData).every((val) => val !== "");
    setIsFormValid(isValid);
  }, [newRowData]);

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

  const handleDelete = useCallback((id: string) => {
    const row = rowsData.find((row) => row.id === id);
    if (row) setRowToDelete(row);
    setOpenDeleteDialog(true);
  }, [rowsData]);

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

  const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRowData((prev: any) => {
      const updated = { ...prev, [name]: value };
      const isValid = Object.values(updated).every((val) => val !== "");
      setIsEditFormValid(isValid);
      return updated;
    });
  }, []);

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
        renderCell: (params: any) => renderActionsCell({ ...params, api: { gridOptions } }),
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

      <CreateDialog
        open={openCreateDialog}
        newRowData={newRowData}
        columnData={columnData}
        isFormValid={isFormValid}
        onFieldChange={handleCreateFieldChange}
        onSave={handleSaveCreate}
        onCancel={handleCancelCreate}
      />

      <EditDialog
        open={editingRow !== null}
        editedRowData={editedRowData}
        columnData={columnData}
        isFormValid={isEditFormValid}
        onFieldChange={handleFieldChange}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default Dashboard;