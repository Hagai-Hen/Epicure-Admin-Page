import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { renderActionsCell } from "./columns";
import { DASHBOARD } from "../../resources/content";
import CreateDialog from "../Dialogs/CreateDialog";
import EditDialog from "../Dialogs/EditDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import {
  CustomPaper,
  DashboardContainer,
  DashboardCreateButton,
  DashboardHeaderContainer,
  DashboardLeftHeader,
  DashboardRightHeader,
  DashboardHeaderTitle,
  DashboardBackContainer,
  DashboardBackIcon,
  DashboardHeaderBack,
  DashboardHeaderEntries,
} from "./styles";
import { UnknownAction } from "@reduxjs/toolkit";

interface Column extends Omit<GridColDef, "renderCell"> {
  renderCell?: (params: any) => JSX.Element;
}

interface DashboardProps {
  data: any[];
  setActivePage: (page: string) => void;
  columnData: Column[];
  actions: {
    setAction: (data: any[]) => void;
    createAction: (data: any) => UnknownAction;
    updateAction: (data: any) => UnknownAction;
    deleteAction: (id: string) => UnknownAction;
    getData: () => UnknownAction;
  };
}
interface RowData {
  id: string;
  dishes?: { id: string; name?: string }[];
  restaurants?: { id: string; name?: string }[];
  restaurant?: {id: string};
}

export const Dashboard = ({
  data,
  setActivePage,
  columnData,
  actions,
}: DashboardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editingRow, setEditingRow] = useState<RowData | null>(null);
  const [editedRowData, setEditedRowData] = useState<RowData>({ id: "" });
  const [rowsData, setRowsData] = useState<RowData[]>(data);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<RowData | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditFormValid, setIsEditFormValid] = useState(true);

  const paginationModel = { page: 0, pageSize: 5 };

  const newRowDataInitial = useMemo(() => {
    return columnData.reduce((acc: any, col: Column) => {
      if (col.field !== "actions" && col.field !== "img") {
        acc[col.field] = ""; // Initialize other fields with an empty string
      }
      return acc;
    }, {});
  }, [columnData]);
  
  const [newRowData, setNewRowData] = useState<any>(newRowDataInitial);

  const { collection } = useParams<{ collection: string }>();
  let displayName = "";
  if (collection)
    displayName = collection.charAt(0).toUpperCase() + collection.slice(1);

  useEffect(() => {
    setActivePage(collection || "");
    setRowsData(data);
  }, [collection, data]);

  const handleCreateDialogOpen = useCallback(() => {
    setOpenCreateDialog(true);
  }, []);
  const handleCreateFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedRowData = { ...newRowData, [name]: value };
      setNewRowData(updatedRowData);
      const isValid = Object.values(updatedRowData).every((val) => {
        if (Array.isArray(val)) {
          return val.length > 0;
        }
        return val !== "";
      });
      setIsFormValid(isValid);
    },
    [newRowData]
  );

  const handleSaveCreate = useCallback(() => {
    dispatch(actions.createAction(newRowData));
    setOpenCreateDialog(false);
    setIsFormValid(false);
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
      dispatch(actions.deleteAction(rowToDelete.id));
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
    const editedDishes = editedRowData?.dishes?.filter(
      (dish: { id: string; name?: string }) => {
        if (dish.id || dish.name) {
          return false;
        }
        return true;
      }
    );

    const editedRests = editedRowData?.restaurants?.filter(
      (dish: { id: string; name?: string }) => {
        if (dish.id || dish.name) {
          return false;
        }
        return true;
      }
    );
    const editedData = { ...editedRowData, dishes: editedDishes, restaurants: editedRests, restaurant: editedRowData.restaurant?.id ? editedRowData.restaurant.id : editedRowData.restaurant};
    setEditingRow(null);
    dispatch(actions.updateAction(editedData));
  }, [rowsData, editingRow, editedRowData]);

  const handleCancelEdit = useCallback(() => {
    setEditingRow(null);
  }, []);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const updatedColumns = columnData
    .filter((col) => col.field !== "chef")
    .map((col) => {
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
              {rowsData.length} {DASHBOARD.HEADER.ENTRIES}
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
        setNewRowData={setNewRowData}
        collection={collection}
      />

      <EditDialog
        open={editingRow !== null}
        editedRowData={editedRowData}
        columnData={columnData}
        isFormValid={isEditFormValid}
        onFieldChange={handleFieldChange}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        collection={collection}
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
