import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const renderActionsCell = (params: any) => {
  return (
    <>
      <IconButton
        onClick={() => params.api.gridOptions.handleEdit(params.row)}
        color="default"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => params.api.gridOptions.handleDelete(params.id)}
        color="default"
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export const renderImgCell = (params: any) => {
  return (
    <>
      <img
        src={params.value}
        alt="Restaurant Image"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
    </>
  );
};

export const RestaurantColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "img",
    headerName: "Image",
    width: 130,
    renderCell: renderImgCell,
  },
  {
    field: "chef_name",
    headerName: "Chef Name",
    width: 130,
  },
  {
    field: "rate",
    headerName: "Rate",
    width: 130,
  },
  {
    field: "dishes",
    headerName: "Dishes",
    width: 130,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: renderActionsCell,
  },
];

export const ChefColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "img",
    headerName: "Image",
    width: 130,
    renderCell: renderImgCell,
  },
  {
    field: "description",
    headerName: "Description",
    width: 180,
  },
  {
    field: "restaurants",
    headerName: "Restaurants",
    width: 130,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: renderActionsCell,
  },
];

export const DishColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "img",
    headerName: "Image",
    width: 130,
    renderCell: renderImgCell,
  },
  {
    field: "price",
    headerName: "Price",
    width: 90,
  },
  {
    field: "ingredients",
    headerName: "Ingredients",
    width: 180,
  },
  {
    field: "restaurant",
    headerName: "Restaurant",
    width: 130,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: renderActionsCell,
  },
];
