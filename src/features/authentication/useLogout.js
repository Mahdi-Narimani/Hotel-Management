import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Logout } from '../../services/apiAuth'

export const useLogout = () =>
{
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: Logout,
        onSuccess: () =>
        {
            queryClient.removeQueries();
            navigate('/login', { replace: true })
        }
    })

    return { logout, isLoading }
}