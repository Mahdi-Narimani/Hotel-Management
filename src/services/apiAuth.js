import supabase from './supabase'


export const Signup = async ({ fullName, email, password }) =>
{
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    })

    if (error) throw new Error(error.message);

    return data;
}

export const Login = async ({ email, password }) =>
{
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })

    if (error) throw new Error(error.message);

    return data
}

export const getCurrentUser = async () =>
{
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data.user
}

export const Logout = async () =>
{
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export const updateCurrentUser = async ({ fullName, password, avatar }) =>
{
    // 1. Update fullName OR password
    let updateData;
    if (fullName) updateData = { data: { fullName } }
    if (password) updateData = { password }
    
    const { data, error } = await supabase
        .auth
        .updateUser(updateData)

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: ErrorStorage } = await supabase
        .storage
        .from('avatars')
        .upload(fileName, avatar);

    if (ErrorStorage) throw new Error(ErrorStorage.message);

    // 3. Update avatar in the user
    const { data: updateUser, error: ErrorUpdateUser } = await supabase
        .auth
        .updateUser({ data: { avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}` } })

    if (ErrorUpdateUser) throw new Error(ErrorUpdateUser.message);

    return updateUser;


}