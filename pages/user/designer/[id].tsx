import { useEffect, useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useFurnitureStore } from "../../../src/stores/FurnitureStore";
import { useRouter } from "next/router";

const PageLayout = dynamic(() => import("../../../src/ui/Layout/PageLayout"), {
  ssr: false,
});

function App() {
  const router = useRouter();
  const { id } = router.query;
  const { getCategories } = useFurnitureStore();
  const [foundwindow, setFoundwindow] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setFoundwindow(true);
    }
    console.log(id);
    getCategories();
  }, []);
  if (foundwindow) {
    return (
      <div>
        <PageLayout id={id}></PageLayout>
      </div>
    );
  }
  return <div></div>;
}
export default App;
