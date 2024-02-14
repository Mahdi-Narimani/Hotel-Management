import { useMutation } from 'react-query';
import { Signup } from '../../services/apiAuth';
import toast from 'react-hot-toast'

export const useSignup = () =>
{
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: ({ fullName, email, password }) => Signup({ fullName, email, password }),
        onSuccess: () =>
        {
            toast.success('Account successfully created! Please verify the new account from the user\'s email address.')
        }
    })

    return { signup, isLoading }
}