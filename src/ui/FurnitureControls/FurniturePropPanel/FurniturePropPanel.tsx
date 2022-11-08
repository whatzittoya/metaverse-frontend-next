import {
  createStyles,
  Navbar,
  ScrollArea,
  Select,
  SimpleGrid,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useStore } from "../../../stores/EditorStore";
const useStyles = createStyles((theme) => ({
  mb: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
}));

export function FurniturePropPanel() {
  useEffect(() => {}, []);

  return (
    <>
      <Navbar.Section></Navbar.Section>
      <Navbar.Section style={{ height: "100%" }} grow mx="-xs" px="xs">
        <ScrollArea style={{ width: "320", height: "90%" }}>
          <SimpleGrid style={{ padding: 5 }}>
            <div>
              <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Name {useStore.getState().furniture.name}
                    </label>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      id="username"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Description
                    </label>
                    <textarea
                      className="resize rounded-md text-gray-700 text-sm font-bold mb-2"
                      id="description"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </SimpleGrid>
        </ScrollArea>
      </Navbar.Section>
    </>
  );
}
