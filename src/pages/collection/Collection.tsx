import { Dashboard } from "../../components/Dashboard/Dashboard.tsx";
import { useParams } from "react-router-dom";
import { COLLECTIONS, COLLECTIONS_DATA } from "../../resources/content.ts"; // Import the collections map

function CollectionPage({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) {
  const { collection } = useParams<{ collection: string }>();

  if (!collection || !COLLECTIONS[collection.toLowerCase() as keyof typeof COLLECTIONS]) {
    return <h1>{COLLECTIONS.NOT_FOUND}</h1>;
  }

  const collectionData = COLLECTIONS_DATA[collection.toUpperCase() as keyof typeof COLLECTIONS_DATA];
  const { data, columns } = collectionData;

  return (
    <Dashboard
      data={data}
      columnData={columns}
      setActivePage={setActivePage}
    />
  );
}

export default CollectionPage;
