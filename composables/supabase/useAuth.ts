const useAuth = () => {
  const user = useState('user', () => null)
  const supabase = useSupabaseClient()
  const router = useRouter()

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null
  })

  const supabaseSignIn = async (email: string, password: string) => {
    const { user: u, error } = await supabase.auth.signIn({
      email,
      password
    });
    if (error) throw error
    return u;
  }

  const supabaseSignUp = async ({ email, password, ...metaData }) => {
    const { user: u, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: metaData,
        redirectTo: `${window.location.origin}/profile?source=email`
      }
    );
    if (error) throw error;
    return u;
  }

  const supabaseIsLoggedIn = () => {
    return !!user.value
  }

  const supabaseSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push("/login")
  }

  return {
    user,
    supabaseSignIn,
    supabaseSignUp,
    supabaseIsLoggedIn,
    supabaseSignOut,
  }
}

export default useAuth