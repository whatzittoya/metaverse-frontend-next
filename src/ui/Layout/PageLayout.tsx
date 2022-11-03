import { Center, Grid, Image, Modal } from "@mantine/core";
import { isMobile } from "react-device-detect";
import { EditorRoot } from "../../editor/EditorRoot";
import { WelcomeModal } from "../WelcomeModal";
import { ToolNavbar } from "./ToolNavbar";
import ArcadaLogo from "../../res/logo.png";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PageLayout({ id = null }) {
  // if (isMobile) {
  //     return <>
  //         <Modal
  //             opened={true}
  //             withCloseButton={false}
  //             onClose={() => (false)}
  //         >
  //             <Center>
  //                 <Image src={ArcadaLogo}/>
  //             </Center>
  //             We're sorry, but Arcada is currently only intended for desktops.
  //         </Modal>
  //     </>
  // }
  return (
    <>
      <WelcomeModal id={id} />

      <ToolNavbar></ToolNavbar>

      <EditorRoot />
    </>
  );
}
