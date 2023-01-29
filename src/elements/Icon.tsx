import * as MaterialDesign from "react-icons/md";
import * as ThemifyIcons from "react-icons/ti";

export function Logout({ size = 24, color = "#000" }) {
  return <MaterialDesign.MdOutlineLogout size={size} color={color} />;
}

export function Search({ className = "", size = 24, color = "#000" }) {
  return (
    <MaterialDesign.MdOutlineSearch
      className={className}
      size={size}
      color={color}
    />
  );
}

export function Delete({ className = "", size = 24, color = "#000" }) {
  return (
    <ThemifyIcons.TiDeleteOutline
      className={className}
      size={size}
      color={color}
    />
  );
}
