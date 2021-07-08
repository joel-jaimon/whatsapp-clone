import { useContext } from "react";
import { dropDownContext } from "../../context/dropDownContext";
import { AddAvatarDropdown } from "./Components/AddAvatarDropdown";
import { ChangeAvatarDropdown } from "./Components/ChangeAvatarDropdown";

export const DropMenu = () => {
  const { dropMenu }: any = useContext(dropDownContext);

  switch (dropMenu.type) {
    case "addAvatar":
      return <AddAvatarDropdown />;
    case "changeAvatar":
      return <ChangeAvatarDropdown />;
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
