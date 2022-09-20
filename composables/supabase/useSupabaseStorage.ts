import useSupabase from "./useSupabase"

const useSupabaseStorage = () => {
  const { supabase } = useSupabase()

  const saveImage = async (productName: string, file: File) => {
    const { data, error } = await supabase.storage
      .from("icon")
      .upload(`${productName}_${file.name}`, file as File)
      ;
    if (error) throw error
    return data
  }

  const getImageUrl = async (key: string) => {
    const { data, error } = await supabase.storage
      .from('icon')
      .getPublicUrl(key)
    if (error) throw error
    return data
  }
  return {
    getImageUrl,
    saveImage
  }
}

export default useSupabaseStorage