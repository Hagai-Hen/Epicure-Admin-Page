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

import {
  getCollection,
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
} from "../../redux/slices/collectionsSlice";
import { useEffect } from "react";

const collectionToActionsMap: Record<string, any> = {
  getAction: getCollection,
  createAction: createCollectionItem,
  deleteAction: deleteCollectionItem,
  updateAction: updateCollectionItem,
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

  const actions = collectionToActionsMap;

  if (!actions) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>;
  }

  const collectionData =
    COLLECTIONS_DATA[collection.toUpperCase() as keyof typeof COLLECTIONS_DATA];

  useEffect(() => {
    dispatch(getCollection(collection.toLowerCase()));
  }, [collection, actions.deleteAction]);

  const data = useSelector((state: any) => {
    state.collections[collection.toLowerCase()].items;
    console.log(state.collections);
  });

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
