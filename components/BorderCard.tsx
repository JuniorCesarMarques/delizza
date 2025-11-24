import { Border } from "@/lib/types";
import DropdownMenu from "./antd/DropdownMenu";
import { MenuProps } from "antd";
import { useModal } from "@/app/contexts/ModalContext";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCart } from "@/context/cart/cartContext";

export default function BorderCard({ border }: { border: Border }) {
  const { setModalProps } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { addItem, items, removeItem } = useCart();

  const borders = items.filter((item) => item.type === "border");

  const qtyBorders = borders.reduce((acc, border) => border.quantity + acc, 0);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const formatedPrice = border.price.includes(".")
    ? border.price.replace(".", ",")
    : border.price + ",00";

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${baseUrl}/api/border/${border.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir");
      }
    },

    onSuccess: () => {
      toast.success("Borda excluída com sucesso!");

      queryClient.invalidateQueries({ queryKey: ["borders"] });
    },

    onError: () => {
      toast.error("Falha ao excluir adicional");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "delete") {
      setModalProps({
        text: "Tem certeza que deseja excluir?",
        callback: handleDelete,
      });
    }

    if (e.key === "edit") {
      router.push(`${baseUrl}/border/edit/${border.id}`);
    }
  };

  return (
    <div
      onClick={() => {
        const current = borders[0]; 

        removeItem(current?.id);

        if (!current || current.id !== border.id) {
          addItem({
            id: border.id,
            name: border.name,
            price: Number(border.price),
            quantity: 1,
            type: "border",
          });
        }
      }}
      className={`${
        borders.find((b) => b.id === border.id) ? "border-blue-500" : ""
      } w-60 rounded-xl p-5 border relative flex shadow flex-col gap-1 hover:shadow-md transition`}
    >
      <div className="absolute top-0 right-2">
        <DropdownMenu
          handleClick={handleMenuClick}
          items={[
            { label: "Editar", key: "edit" },
            { label: "Excluir", key: "delete" },
          ]}
        />
      </div>

      <span className="font-semibold text-gray-800 truncate">
        {border.name}
      </span>

      <span className="font-bold text-green-600">R$ {formatedPrice}</span>
    </div>
  );
}
