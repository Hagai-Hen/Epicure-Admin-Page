import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { COLLECTIONS, COLLECTIONS_DATA } from "../../resources/content";
import {
  getCollection,
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
  setCollectionData,
} from "../../redux/slices/collectionsSlice";
import { useEffect, useState } from "react";

const collectionToActionsMap: Record<string, any> = {
  getAction: getCollection,
  createAction: createCollectionItem,
  deleteAction: deleteCollectionItem,
  updateAction: updateCollectionItem,
  setCollectionData: setCollectionData
};

function CollectionPage({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) {
  const { collection } = useParams<{ collection: string }>();
  const dispatch = useDispatch();

  // If collection is not found, show a not found message
  if (
    !collection ||
    !COLLECTIONS[collection.toLowerCase() as keyof typeof COLLECTIONS]
  ) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>;
  }

  // Set actions based on the collection type
  const actions = collectionToActionsMap;

  // If actions are not found for a collection, show a not found message
  if (!actions) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>;
  }

  // Get collection data from resources
  const collectionData =
    COLLECTIONS_DATA[collection.toUpperCase() as keyof typeof COLLECTIONS_DATA];

  // Local state for pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Fetch collection data when page or collection changes
  useEffect(() => {
    dispatch(
      actions.getAction({
        collection: collection.toLowerCase(),
        page: paginationModel.page,
        limit: paginationModel.pageSize,
      })
    );
  }, [collection, dispatch, actions]);

  // Get collection data from Redux store
  const data = useSelector(
    (state: any) => state.collections[collection?.toLowerCase()]?.items
  );

  // Get column data for the collection
  const columns = collectionData.columns;

  // console.log("data^^^", data);

  return (
    <Dashboard
      // data={data}
      columnData={columns}
      setActivePage={setActivePage}
      actions={actions}
    />
  );
}

export default CollectionPage;
