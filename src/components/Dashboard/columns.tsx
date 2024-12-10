import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableImg } from "./styles";

interface ParamsInterface {
  value: string;
  api: {
    gridOptions: {
      handleEdit: (s: string) => void;
      handleDelete: (s: string) => void;
    };
  };
  row: string;
  id: string;
}

export const renderActionsCell = (params: ParamsInterface) => {
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

export const renderImgCell = (params: ParamsInterface) => {
  return <TableImg src={params.value} />;
};

export const dishesRenderCell = (params: any) => {
  const dishes = params.row.dishes;
  if (dishes) {
    const dishNames = dishes
      .map((dish: { id: string; name: string }) => dish?.name)
      .join(", ");
    return <span>{dishNames}</span>;
  }
};

export const restaurantsRenderCell = (params: any) => {
  const restaurants = params.row.restaurants;
  if (restaurants) {
    const restaurantNames = restaurants
      .map((dish: { id: string; name: string }) => dish?.name)
      .join(", ");
    return <span>{restaurantNames}</span>;
  }
};

export const restaurantRenderCell = (params: any) => {
  const restaurant = params.row.restaurant;
  if (restaurant) {
    return <span>{restaurant.name}</span>;
  }
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
