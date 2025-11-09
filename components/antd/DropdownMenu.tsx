"use client";

import React from "react";
import { SlOptions } from "react-icons/sl";
import { Dropdown, Space, MenuProps } from "antd";


type DropdownMenuProps = {
  items: MenuProps["items"];
  handleClick: MenuProps["onClick"];
};

const DropdownMenu = ({ items, handleClick }: DropdownMenuProps) => {

  return (
    <Dropdown menu={{ items, onClick: handleClick }} trigger={["click"]}>
      <Space>
        <SlOptions />
      </Space>
    </Dropdown>
  );
};

export default DropdownMenu;
