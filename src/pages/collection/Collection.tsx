import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { COLLECTIONS, COLLECTIONS_DATA } from "../../resources/content"; // Import the collections map

const collectionToReduxSliceMap: Record<string, string> = {
  chefs: "chefs",
  restaurants: "restaurants",
  dishes: "dishes",
};

function CollectionPage({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) {
  const { collection } = useParams<{ collection: string }>();

  if (!collection || !COLLECTIONS[collection.toLowerCase() as keyof typeof COLLECTIONS]) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>;
  }

  const reduxSliceName = collectionToReduxSliceMap[collection.toLowerCase()];

  if (!reduxSliceName) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>; // Return a "not found" message if the collection is invalid
  }

  const collectionData = COLLECTIONS_DATA[collection.toUpperCase() as keyof typeof COLLECTIONS_DATA];
  const data = useSelector((state: any) => state[reduxSliceName][reduxSliceName]);
  const columns = collectionData.columns;

  return (
    <Dashboard
      data={data}
      columnData={columns}
      setActivePage={setActivePage}
    />
  );
}

export default CollectionPage;
