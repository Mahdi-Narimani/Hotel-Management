import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Login } from '../../services/apiAuth'

export const useLogin = () =>
{
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: login, isLoading: isLogin } = useMutation({
        mutationFn: ({ email, password }) => Login({ email, password }),
        onSuccess: (user) =>
        {
            navigate('/dashboard');
            queryClient.setQueryData(['user'], user.user)
            toast.success('Welcome to the Wild Oasis')

        },
        onError: () => toast.error('Provided email or password incorrect')
    })

    return { login, isLogin }
}