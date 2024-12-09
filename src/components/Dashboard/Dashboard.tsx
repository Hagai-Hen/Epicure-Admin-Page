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
import { fetchDataPage } from "../../api/collectionApi";

interface Column extends Omit<GridColDef, "renderCell"> {
  renderCell?: (params: any) => JSX.Element;
}

interface DashboardProps {
  data: any[];
  setActivePage: (page: string) => void;
  columnData: Column[];
  actions: {
    createAction: (params: {
      collection: string;
      page: string;
      limit: string;
    }) => UnknownAction;
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
}
interface RowData {
  id: string;
  dishes?: { id: string; name?: string }[];
  restaurants?: { id: string; name?: string }[];
  restaurant?: { id: string };
}

export const Dashboard = ({
  // data,
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
    (state) => state.collections[collection?.toLowerCase()].pagination
  );

  // useEffect(() => {
  //   dispatch(
  //     actions.getAction({
  //       collection: collection?.toLowerCase(),
  //       page: paginationModel.page,
  //       limit: paginationModel.pageSize,
  //     })
  //   );
  // }, [paginationModel, collection, dispatch]);

  useEffect(() => {
    setActivePage(collection || "");
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
          if (Array.isArray(val) && fieldName !== "dishes") {
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
    dispatch(
      actions.getAction({
        collection: collection?.toLowerCase(),
        page: paginationModel.page,
        limit: paginationModel.pageSize,
      })
    );
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
        return prevData.filter((item) => item.id !== rowToDelete.id);
      });
      dispatch(
        actions.getAction({
          collection: collection?.toLowerCase(),
          page: paginationModel.page,
          limit: paginationModel.pageSize,
        })
      );
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
    setEditedRowData({ ...row });
  }, []);

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedRowData((prev: any) => {
        const updated = { ...prev, [name]: value };
        const isValid = Object.values(updated).every((val) => {
          // if (Array.isArray(val)) {
          //   return val.length > 0;
          // }
          return val !== "";
        });
        setIsEditFormValid(isValid);
        return updated;
      });
    },
    []
  );

  const handleSaveEdit = useCallback(() => {
    let editedDishes = editedRowData?.dishes?.filter(
      (dish: { id: string; name?: string }) => {
        if (dish.id || dish.name) {
          return false;
        }
        return true;
      }
    );
    if (editedDishes?.length === 0) {
      editedDishes = editedRowData?.dishes?.map((dish) => dish.id);
    }

    let editedRests = editedRowData?.restaurants?.filter(
      (dish: { id: string; name?: string }) => {
        if (dish.id || dish.name) {
          return false;
        }
        return true;
      }
    );

    if (editedRests?.length === 0) {
      editedRests = editedRowData?.restaurants?.map((rest) => rest.id);
    }
    const editedData = {
      ...editedRowData,
      dishes: editedDishes,
      restaurants: editedRests,
      restaurant: editedRowData.restaurant?.id
        ? editedRowData.restaurant.id
        : editedRowData.restaurant,
    };
    setEditingRow(null);
    setData((prevData) => {
      const index = prevData.findIndex(
        (item: { id: string }) => item.id === editedData.id
      );
      if (index !== -1) {
        const updatedData = [...prevData];
        updatedData[index] = editedData;
        return updatedData;
      }
      return prevData;
    });

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
    console.log(editedData);
    console.log(rowsData);
  }, [editedRowData, collection, paginationModel, dispatch]);

  const handleCancelEdit = useCallback(() => {
    setEditingRow(null);
  }, []);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set()); // To track loaded pages

  // Effect for fetching data
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

    const fetchData = await fetchDataPage(
      collection?.toLowerCase() || "",
      page + 1,
      paginationModel.pageSize
    );

    console.log("Fetched data for page", page + 1, fetchData.data);

    setData((prevData) => {
      const existingIds = new Set(prevData.map((item) => item.id));
      const newItems = fetchData?.data.filter(
        (item) => !existingIds.has(item.id)
      );
      return [...prevData, ...(newItems || "")];
    });

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
              {pagination.totalItems} {DASHBOARD.HEADER.ENTRIES}
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
            rows={rowsData} // Data rows to display
            columns={updatedColumns} // Columns configuration
            pagination
            paginationMode="server" // Enable server-side pagination
            rowCount={pagination.totalItems} // Total number of rows (for pagination calculation)
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
