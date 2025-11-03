"use client";

import React from "react";
import { SlOptions } from "react-icons/sl";
import { Dropdown, Space, MenuProps } from "antd";
import { useModal } from "@/app/contexts/ModalContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

type DropdownMenuProps = {
  items: MenuProps["items"];
  id: string;
};

const DropdownMenu = ({ items, id }: DropdownMenuProps) => {
  const { setModalProps } = useModal();

  const { refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => handleDeleteCategory(id),
    enabled: false, 
  });

  async function handleDeleteCategory(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (data?.error?.code === "P2003") {
        toast.error(
          "Não é possível excluir uma categoria que possua produtos vinculados."
        );
        return;
      }
      toast.error("Erro ao excluir categoria");
      return;
    }

    toast.success("Categoria excluída");
  }

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "delete") {
      setModalProps({
        callback: () => refetch(),
        text: "Tem certeza que deseja excluir?",
      });
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <Space>
        <SlOptions />
      </Space>
    </Dropdown>
  );
};

export default DropdownMenu;
