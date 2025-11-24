import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File, id?: string) {

  console.log("FILE", file)

  // Caso for uma string do banco retorna ela mesmo
  if (typeof file === "string") return file;

  // Caso não passe uma imagem na criação de categoria
  if(!file.name) return null;


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