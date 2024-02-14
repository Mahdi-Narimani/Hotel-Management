import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

import { updateSetting as apiUpdateSetting } from "../../services/apiSettings";

export const useUpdateSettings = () =>
{
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
        mutationFn: apiUpdateSetting,
        onSuccess: () =>
        {
            toast.success('Settings successfully updating');
            queryClient.invalidateQueries({ queryKey: ['settings'] })
        },
        onError: (error) =>
        {
            toast.error(error.message);
        }
    })

    return { isUpdating, updateSettings }
}