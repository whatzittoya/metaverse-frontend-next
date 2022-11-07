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
                      Name
                    </label>
                    <label
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      placeholder="Username"
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
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please choose a password.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                    >
                      Sign Up
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
