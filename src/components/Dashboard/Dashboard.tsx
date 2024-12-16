import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { renderActionsCell } from "./columns";
import { DASHBOARD } from "../../resources/content";
import CreateDialog from "../Dialogs/CreateDialog";
import EditDialog from "../Dialogs/EditDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "../../redux/store";
import { useAuthContext } from "../../context/useAuthContext";
import { Box, Skeleton } from "@mui/material";

interface Column extends Omit<GridColDef, "renderCell"> {
  renderCell?: (params: any) => JSX.Element;
}

interface DashboardProps {
  data: any[];
  setActivePage: (page: string) => void;
  columnData: Column[];
  actions: {
    createAction: (params: { collection: string; item: any }) => UnknownAction;
    updateAction: (params: { collection: string; item: any }) => UnknownAction;
    deleteAction: (params: { collection: string; id: string }) => UnknownAction;
    getAction: (params: {
      collection?: string;
      page: number;
      limit: number;
    }) => UnknownAction;
    setCollectionData: (params: {
      collection: string;
      data: any;
    }) => UnknownAction;
  };
  paginationModel: { page: number; pageSize: number };
  setPaginationModel: (page: number, pageSize: number) => void;
}
interface RowData {
  id: string;
  dishes?: { id: string; name?: string }[];
  restaurants?: { id: string; name?: string }[];
  restaurant?: { id: string };
}

export const Dashboard = ({
  setActivePage,
  columnData,
  actions,
}: DashboardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editingRow, setEditingRow] = useState<RowData | null>(null);
  const [editedRowData, setEditedRowData] = useState<RowData>({ id: "" });
  const [rowsData, setRowsData] = useState<RowData[]>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<RowData | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditFormValid, setIsEditFormValid] = useState(true);
  const [data, setData] = useState([]);
  const { authUser } = useAuthContext();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const newRowDataInitial = useMemo(() => {
    return columnData.reduce((acc: any, col: Column) => {
      if (col.field !== "actions" && col.field !== "img") {
        acc[col.field] = "";
      }
      return acc;
    }, {});
  }, [columnData]);

  const [newRowData, setNewRowData] = useState<any>(newRowDataInitial);

  const { collection } = useParams<{ collection: string }>();
  let displayName = "";
  if (collection)
    displayName = collection.charAt(0).toUpperCase() + collection.slice(1);

  const pagination = useSelector(
    (state: RootState) =>
      state?.collections[collection?.toLowerCase() || ""]?.pagination
  );

  useEffect(() => {
    setActivePage(collection || "");
    setData([]);
    dispatch(
      actions.getAction({
        collection: collection?.toLowerCase(),
        page: paginationModel.page,
        limit: paginationModel.pageSize,
      })
    );
  }, [collection]);

  const handleCreateDialogOpen = useCallback(() => {
    setOpenCreateDialog(true);
  }, []);
  const handleCreateFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const updatedRowData = { ...newRowData, [name]: value };
      setNewRowData(updatedRowData);

      const isValid = Object.entries(updatedRowData).every(
        ([fieldName, val]) => {
          if (
            Array.isArray(val) &&
            fieldName !== "dishes" &&
            fieldName !== "tags"
          ) {
            return val.length > 0;
          } else {
            return val !== "";
          }
        }
      );
      setIsFormValid(isValid);
    },
    [newRowData]
  );
  const handleSaveCreate = useCallback(() => {
    dispatch(
      actions.createAction({
        collection: collection?.toLowerCase() || "",
        item: newRowData,
      })
    );
    setTimeout(() => {
      dispatch(
        actions.getAction({
          collection: collection?.toLowerCase(),
          page: paginationModel.page,
          limit: paginationModel.pageSize,
        })
      );
    }, 500);
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
      const row = rowsData?.find((row) => row.id === id);
      if (row) {
        setRowToDelete(row);
        setOpenDeleteDialog(true);
      }
    },
    [rowsData]
  );

  const confirmDelete = useCallback(() => {
    if (rowToDelete) {
      dispatch(
        actions.deleteAction({
          collection: collection?.toLowerCase() || "",
          id: rowToDelete.id,
        })
      );
      setData((prevData) => {
        return prevData.filter((item: any) => item.id !== rowToDelete.id);
      });
      setTimeout(() => {
        dispatch(
          actions.getAction({
            collection: collection?.toLowerCase(),
            page: paginationModel.page,
            limit: paginationModel.pageSize,
          })
        );
      }, 500);
      setRowToDelete(null);
    }
    setOpenDeleteDialog(false);
  }, [
    rowToDelete,
    collection,
    paginationModel.page,
    paginationModel.pageSize,
    dispatch,
  ]);

  const cancelDelete = useCallback(() => {
    setRowToDelete(null);
    setOpenDeleteDialog(false);
  }, []);

  const handleEdit = useCallback((row: RowData) => {
    setEditingRow(row);
    setEditedRowData({
      ...row,
      dishes: row.dishes ? [] : row.dishes,
      restaurants: row.restaurants ? [] : row.restaurants,
    });
  }, []);

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedRowData((prev: any) => {
        const updated = { ...prev, [name]: value };
        const isValid = Object.values(updated).every((val) => {
          return val !== "";
        });
        setIsEditFormValid(isValid);
        return updated;
      });
    },
    []
  );

  const handleSaveEdit = useCallback(() => {
    let editedDishes = editedRowData?.dishes;
    if (editedDishes?.length === 0) {
      editedDishes = editingRow?.dishes;
    }

    let editedRests = editedRowData?.restaurants;
    if (editedRests?.length === 0) {
      editedRests = editingRow?.restaurants;
    }
    const editedData = {
      ...editedRowData,
      dishes: editedDishes,
      restaurants: editedRests,
    };
    setEditingRow(null);
    dispatch(
      actions.updateAction({
        collection: collection?.toLowerCase() || "",
        item: editedData,
      })
    );

    dispatch(
      actions.getAction({
        collection: collection?.toLowerCase(),
        page: paginationModel.page,
        limit: paginationModel.pageSize,
      })
    );
  }, [editedRowData, collection, paginationModel, dispatch]);

  const updatedData: any = useSelector(
    (state: RootState) =>
      state.collections[collection?.toLowerCase() || ""]?.items
  );

  useEffect(() => {
    if (updatedData) {
      setData(updatedData);
    }
  }, [updatedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingRow(null);
  }, []);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  const fetchDataForPage = async (page: number) => {
    if (loadedPages.has(page)) {
      setRowsData(
        data.slice(
          paginationModel.page * paginationModel.pageSize,
          (paginationModel.page + 1) * paginationModel.pageSize
        )
      );
      return;
    }
    dispatch(
      actions.getAction({
        collection: collection?.toLowerCase(),
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      })
    );

    setRowsData(
      data.slice(
        paginationModel.page * paginationModel.pageSize,
        (paginationModel.page + 1) * paginationModel.pageSize
      )
    );

    setLoadedPages((prev) => new Set(prev).add(page));
  };

  useEffect(() => {
    fetchDataForPage(paginationModel.page);
  }, [paginationModel.page, paginationModel.pageSize, data]);

  const updatedColumns = columnData
    .filter((col) => col.field !== "chef")
    .map((col) => {
      if (col.field === "actions") {
        if (authUser?.role === "ADMIN") {
          return {
            ...col,
            renderCell: (params: any) =>
              renderActionsCell({ ...params, api: { gridOptions } }),
          };
        } else {
          return null;
        }
      }
      return col;
    })
    .filter((col) => col !== null);

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
              {pagination?.totalItems} {DASHBOARD.HEADER.ENTRIES}
            </DashboardHeaderEntries>
          </DashboardLeftHeader>
          <DashboardRightHeader>
            {authUser && (
              <DashboardCreateButton onClick={handleCreateDialogOpen}>
                {DASHBOARD.HEADER.CREATE_BUTTON}
              </DashboardCreateButton>
            )}
          </DashboardRightHeader>
        </DashboardHeaderContainer>
        <CustomPaper>
          <DataGrid
            rows={rowsData}
            columns={updatedColumns}
            pagination
            paginationMode="server"
            rowCount={pagination?.totalItems}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
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
