import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File, id?: string) {

  console.log("FILE", file)

  if(!file) return null;
  if (!file.name) return null;

  // Caso for uma string do banco retorna ela mesmo
  if (typeof file === "string") return file;



  if(id) {
    await supabase.storage
    .from("delizza")
    .remove([file.name])
  }

  const newFileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
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