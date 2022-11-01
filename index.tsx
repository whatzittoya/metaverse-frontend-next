import { useEffect } from "react";
import { PageLayout } from "../src/ui/Layout/PageLayout";
import { useFurnitureStore } from "../src/stores/FurnitureStore";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  const { getCategories } = useFurnitureStore();

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <PageLayout />
    </div>
  );
}
export default App;
