import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File) {
    console.log("UPLOAD IMAGE", file)
  if (!file) return null;


  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("delizza") // nome do bucket no supabase
    .upload(fileName, file);

  if (error) {
    console.error("Erro ao enviar:", error);
    return null;
  }

  // Pega URL pública
  const { data: publicUrl } = supabase.storage
    .from("delizza")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}