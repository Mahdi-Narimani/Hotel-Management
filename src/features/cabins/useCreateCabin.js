import { useMutation, useQueryClient } from "react-query";
import { createAndEditCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = () =>
{
    const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createCabinApi,
        onSuccess: () =>
        {
            toast.success('New Cabin successfully created');
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
        },
        onError: (error) =>
        {
            toast.error(error.message);
        }
    })

    return {isCreating, createCabin}
}