"use client";

import { SlOptions } from "react-icons/sl";
import { Dropdown, Space, MenuProps } from "antd";
import { useAuth } from "@/app/contexts/AuthContext";


type DropdownMenuProps = {
  items: MenuProps["items"];
  handleClick: MenuProps["onClick"];
};

const DropdownMenu = ({ items, handleClick }: DropdownMenuProps) => {

  const { user } = useAuth();
  console.log("USER", user)

  if(!user) return


  return (
    <Dropdown menu={{ items, onClick: handleClick }} trigger={["click"]}>
      <Space>
        <SlOptions />
      </Space>
    </Dropdown>
  );
};

export default DropdownMenu;
