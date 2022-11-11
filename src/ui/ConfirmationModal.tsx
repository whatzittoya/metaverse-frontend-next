import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal, Button, Group } from "@mantine/core";

function ConfirmationModal({
  opened,
  setOpened,
  name,
  setName,
  onSave,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  onSave: void;
}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirmation save"
      >
        <div className="container  bg-blueGray-100 rounded-md p-3 grid">
          <p>Give your design a name</p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="My Design"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              onClick={() => {
                setOpened(false);
                onSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group> */}
    </>
  );
}
export default ConfirmationModal;
