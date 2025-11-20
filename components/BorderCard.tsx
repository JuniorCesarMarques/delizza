import { Border } from "@/lib/types";
import DropdownMenu from "./antd/DropdownMenu";
import { MenuProps } from "antd";
import { useModal } from "@/app/contexts/ModalContext";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function BorderCard({ border }: { border: Border }) {
  const { setModalProps } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

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
    <div className="w-60 border rounded-xl p-3 shadow-sm bg-white relative flex flex-col gap-1 hover:shadow-md transition">
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
