import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { COLLECTIONS, COLLECTIONS_DATA } from "../../resources/content";

import {
  setChefs,
  createChef,
  updateChef,
  deleteChef,
} from "../../redux/slices/chefsSlice";

import {
  setRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../redux/slices/restaurantsSlice";

import {
  setDishes,
  createDish,
  updateDish,
  deleteDish,
} from "../../redux/slices/dishesSlice";
import { useEffect } from "react";

const collectionToActionsMap: Record<string, any> = {
  chefs: {
    setAction: setChefs,
    createAction: createChef,
    updateAction: updateChef,
    deleteAction: deleteChef,
  },
  restaurants: {
    setAction: setRestaurants,
    createAction: createRestaurant,
    updateAction: updateRestaurant,
    deleteAction: deleteRestaurant,
  },
  dishes: {
    setAction: setDishes,
    createAction: createDish,
    updateAction: updateDish,
    deleteAction: deleteDish,
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
