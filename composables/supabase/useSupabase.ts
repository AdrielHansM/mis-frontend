import { createClient } from '@supabase/supabase-js'

const useSupabase = () => {
  const supabase = useSupabaseClient()

  return {
    supabase
  }
}

export default useSupabase;