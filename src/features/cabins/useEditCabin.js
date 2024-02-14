import { useMutation, useQueryClient } from "react-query";
import { createAndEditCabin as editCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () =>
{
    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabin, editId }) => editCabinApi(newCabin, editId),
        onSuccess: () =>
        {
            toast.success('Cabin successfully edited');
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
        },
        onError: (error) =>
        {
            toast.error(error.message);
        }
    })

    return { isEditing, editCabin }
}