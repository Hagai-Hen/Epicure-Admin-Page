import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { COLLECTIONS, COLLECTIONS_DATA } from "../../resources/content";
import {
  getCollection,
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
  setCollectionData,
} from "../../redux/slices/collectionsSlice";
import { fetchData } from "../../api/collectionApi"; // Ensure you have this function

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

  // State to hold fetched data
  const [chefs, setChefs] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  // Fetch data asynchronously when the page loads
  useEffect(() => {
    const fetchCollectionData = async () => {
      const chefs  = await fetchData("chefs");
      const dishes  = await fetchData("dishes");
      const restaurants  = await fetchData("restaurants");
      setChefs(chefs || []);
      setDishes(dishes || []);
      setRestaurants(restaurants || []);
    };

    fetchCollectionData();
  }, [collection]);

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

  // Dynamically update the columns with fetched data
  const updateColumnsData = (columns: any[]) => {
    return columns.map((column) => {
      if (column.type === "list") {
        if (column.field === "chef") {
          column.options = chefs?.map((chef) => ({
            id: chef.id,
            name: chef.name,
          }));
        } else if (column.field === "dishes") {
          column.options = dishes?.map((dish) => ({
            id: dish.id,
            name: dish.name,
          }));
        } else if (column.field === "restaurants") {
          column.options = restaurants?.map((restaurant) => ({
            id: restaurant.id,
            name: restaurant.name,
          }));
        }
      }
      return column;
    });
  };

  // Update the columns with the data
  const updatedColumns = updateColumnsData(collectionData.columns);

  return (
    <Dashboard
      columnData={updatedColumns}
      setActivePage={setActivePage}
      actions={actions}
    />
  );
}

export default CollectionPage;
