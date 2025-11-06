import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File, id?: string) {

  console.log("FILE", file)

  if (!(file instanceof File)) return file;


  if(id) {
    await supabase.storage
    .from("delizza")
    .remove([file.name])
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