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

const changeApi = (e: InputEvent) => {
  const furniture = useStore.getState().furniture;
  furniture.api = e.target.value;
  useStore.setState({ furniture: furniture });
};

const changeInteractable = (e: InputEvent) => {
  const furniture = useStore.getState().furniture;
  furniture.interactable = e.target.value;
  useStore.setState({ furniture: furniture });
};

const saveDescr = (e: SubmitEvent) => {
  e.preventDefault();
  const furniture = useStore.getState().furniture;
  const action = new UpdateFurnitureAction(
    furniture.id,
    furniture.description,
    furniture.api,
    furniture.interactable
  );
  action.execute();
};
export function FurniturePropPanel() {
  useEffect(() => {
    //setDescr(useStore.getState().furniture.description.toString());
  }, []);

  return (
    <>
      <Navbar.Section style={{ height: "100%" }} grow mx="-xs" px="xs">
        <ScrollArea style={{ width: "320", height: "90%" }}>
          <SimpleGrid style={{ padding: 5 }}>
            <div>
              <div className="w-full max-w-xs">
                <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={saveDescr}
                >
                  <div className="mb-3">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name {useStore.getState().furniture.name}
                    </label>
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="descr"
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
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="descr"
                    >
                      API Url
                    </label>
                    <input
                      type="text"
                      className="rounded-md text-gray-700 text-sm font-bold mb-2"
                      id="api"
                      value={useStore.getState().furniture.api.toString()}
                      onChange={changeApi}
                    ></input>
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="descr"
                    >
                      Interactable
                    </label>
                    <select
                      id="interact"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                      value={useStore
                        .getState()
                        .furniture.interactable.toString()}
                      onChange={changeInteractable}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
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
