import {
  createStyles,
  Navbar,
  ScrollArea,
  Select,
  SimpleGrid,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { UpdateFurnitureAction } from "../../../editor/editor/actions/UpdateFurnitureAction";
import { useStore } from "../../../stores/EditorStore";
let descr = React.createRef();
const useStyles = createStyles((theme) => ({
  mb: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
}));

const changeDescr = (e: InputEvent) => {
  const furniture = useStore.getState().furniture;
  furniture.description = e.target.value;
  useStore.setState({ furniture: furniture });
};

const saveDescr = (e: SubmitEvent) => {
  e.preventDefault();
  const furniture = useStore.getState().furniture;
  const action = new UpdateFurnitureAction(furniture.id, furniture.description);
  action.execute();
};
export function FurniturePropPanel() {
  useEffect(() => {
    //setDescr(useStore.getState().furniture.description.toString());
  }, []);

  return (
    <>
      <Navbar.Section></Navbar.Section>
      <Navbar.Section style={{ height: "100%" }} grow mx="-xs" px="xs">
        <ScrollArea style={{ width: "320", height: "90%" }}>
          <SimpleGrid style={{ padding: 5 }}>
            <div>
              <div className="w-full max-w-xs">
                <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={saveDescr}
                >
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
                      value={useStore
                        .getState()
                        .furniture.description.toString()}
                      onChange={changeDescr}
                      className="resize rounded-md text-gray-700 text-sm font-bold mb-2"
                      id="description"
                    ></textarea>
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
