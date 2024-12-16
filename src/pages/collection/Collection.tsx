import { useParams } from "react-router-dom";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { COLLECTIONS, COLLECTIONS_DATA } from "../../resources/content";
import {
  getCollection,
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
  setCollectionData,
} from "../../redux/slices/collectionsSlice";

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

  const columns = collectionData.columns;

  return (
    <Dashboard
      columnData={columns}
      setActivePage={setActivePage}
      actions={actions}
    />
  );
}

export default CollectionPage;
