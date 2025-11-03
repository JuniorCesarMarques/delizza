import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File, id?: string) {

  if (!file) return null;

  const fileName = "nome";

  if(id) {
    const {data, error} = await supabase.storage
    .from("delizza")
    .remove([fileName])
  }

  const newFileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("delizza") // nome do bucket no supabase
    .upload(newFileName, file);


  if (error) {
    console.error("Erro ao enviar:", error);
    return null;
  }

  // Pega URL pública
  const { data: publicUrl } = supabase.storage
    .from("delizza")
    .getPublicUrl(newFileName);

  return publicUrl.publicUrl;
}