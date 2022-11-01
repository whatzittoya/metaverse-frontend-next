import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Group,
  useMantineTheme,
  Center,
  Image,
  Menu,
  createStyles,
  Stack,
} from "@mantine/core";
import { Database, Plus, RotateClockwise } from "tabler-icons-react";
import { LoadAction } from "../editor/editor/actions/LoadAction";
import ArcadaLogo from "../../assets/logo.png";
import { FloorPlan } from "../editor/editor/objects/FloorPlan";
import { showNotification } from "@mantine/notifications";
import { getDesign } from "../api/api-client";
export function WelcomeModal() {
  const [opened, setOpened] = useState(false);
  const fileRef = useRef<HTMLInputElement>();
  const image = <Image src={ArcadaLogo} />;
  const useStyles = createStyles(() => ({
    padded: {
      padding: "4px",
    },
  }));

  const loadFromDisk = async () => {
    //let resultText = await e.target.files.item(0).text();
    let resultText = await getDesign();
    if (resultText) {
      //let action = new LoadAction(resultText);
      let action = new LoadAction(JSON.stringify(resultText));
      action.execute();
      setOpened(false);
    }
  };

  const theme = useMantineTheme();
  const { classes } = useStyles();
  useEffect(() => {
    setOpened(true);
  }, []);

  const notification = {
    title: "Welcome to Room Builder App! 🎉",
    message:
      "⚒️ Use the tools on the left to create your floor plan. For detailed instructions, press the Help button on the left.",
  };
  return (
    <>
      <Modal
        className={classes.padded}
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={opened}
        withCloseButton={false}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        centered
        onClose={() => {
          setOpened(false);
          showNotification(notification);
        }}
      >
        <Stack spacing="xs">
          {image}
          <Button
            onClick={() => {
              setOpened(false);
              showNotification(notification);
            }}
            leftIcon={<Plus />}
            variant="white"
          >
            New plan
          </Button>

          <Button
            onClick={() => {
              loadFromDisk();
            }}
            leftIcon={<Database />}
            variant="white"
          >
            Load from Galery
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
