import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { COLLECTIONS, COLLECTIONS_DATA } from "../../resources/content";

import {
  setChefs,
  CreateChef,
  UpdateChef,
  DeleteChef,
  getChefs,
} from "../../redux/slices/chefsSlice";

import {
  setRestaurants,
  UpdateRestaurant,
  DeleteRestaurant,
  getRestaurants,
  CreateRestaurant,
} from "../../redux/slices/restaurantsSlice";

import {
  setDishes,
  CreateDish,
  UpdateDish,
  DeleteDish,
  getDishes,
} from "../../redux/slices/dishesSlice";
import { useEffect } from "react";

const collectionToActionsMap: Record<string, any> = {
  chefs: {
    setAction: setChefs,
    createAction: CreateChef,
    updateAction: UpdateChef,
    deleteAction: DeleteChef,
    getAction: getChefs,
  },
  restaurants: {
    setAction: setRestaurants,
    createAction: CreateRestaurant,
    updateAction: UpdateRestaurant,
    deleteAction: DeleteRestaurant,
    getAction: getRestaurants,
  },
  dishes: {
    setAction: setDishes,
    createAction: CreateDish,
    updateAction: UpdateDish,
    deleteAction: DeleteDish,
    getAction: getDishes,
  },
};

function CollectionPage({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) {
  const { collection } = useParams<{ collection: string }>();
  const dispatch = useDispatch();

  if (
    !collection ||
    !COLLECTIONS[collection.toLowerCase() as keyof typeof COLLECTIONS]
  ) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>;
  }

  const actions = collectionToActionsMap[collection.toLowerCase()];

  if (!actions) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>;
  }

  const collectionData =
    COLLECTIONS_DATA[collection.toUpperCase() as keyof typeof COLLECTIONS_DATA];

  useEffect(() => {
    dispatch(actions.getAction());
  }, [collection, actions.deleteAction]);

  const data = useSelector(
    (state: any) => state[collection.toLowerCase()][collection.toLowerCase()]
  );

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(actions.setAction());
    }
  }, [data, dispatch, actions.setAction]);

  const columns = collectionData.columns;

  return (
    <Dashboard
      data={data}
      columnData={columns}
      setActivePage={setActivePage}
      actions={actions}
    />
  );
}

export default CollectionPage;
