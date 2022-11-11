import { useEffect, useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useFurnitureStore } from "../../../src/stores/FurnitureStore";

const PageLayout = dynamic(() => import("../../../src/ui/Layout/PageLayout"), {
  ssr: false,
});

function App() {
  const { getCategories } = useFurnitureStore();
  const [foundwindow, setFoundwindow] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setFoundwindow(true);
    }

    getCategories();
  }, []);
  if (foundwindow) {
    return (
      <div>
        <PageLayout></PageLayout>
      </div>
    );
  }
  return <div></div>;
}
export default App;
