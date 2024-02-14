import { useMutation, useQueryClient } from 'react-query'
import { updateCurrentUser } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export const useUpdateUser = () =>
{

    const queryClient = useQueryClient()

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: ({ fullName, password, avatar }) => updateCurrentUser({ fullName, password, avatar }),
        onSuccess: ({ user }) =>
        {
            queryClient.setQueryData(['user'], user)
            toast.success('user successfully update')
        }
    })

    return { updateUser, isUpdating }
}