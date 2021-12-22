import { MegaMenu } from "primereact/megamenu";


//Items
import {items} from "./sideBarConfig"
import { IPropsMenu } from './types';

const SideBar = (props: IPropsMenu) => {
  const { orientation } = props;  
  return (
    <>
      {orientation === "horizontal" && <MegaMenu model={items} />}
      {orientation === "vertical" && <MegaMenu model={items} orientation="vertical" />}
    </>
  );
};

export default SideBar;
