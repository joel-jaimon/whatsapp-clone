import { useContext } from "react";
import { dropDownContext } from "../../context/dropDownContext";
import { AddAvatarDropdown } from "./Components/AddAvatarDropdown";

export const DropMenu = () => {
  const { dropMenu }: any = useContext(dropDownContext);

  switch (dropMenu.type) {
    case "addAvatar":
      return <AddAvatarDropdown />;
    default:
      return (
        <div
          style={{
            display: "none",
          }}
        />
      );
  }
};
