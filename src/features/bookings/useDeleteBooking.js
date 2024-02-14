import { useMutation, useQueryClient } from 'react-query';
import { deleteBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast'

export const useDeleteBooking = () =>
{
    const queryClient = useQueryClient();
    const { mutate: DeleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: (bookingId) => deleteBooking(bookingId),
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
            toast.success(`Booking successfully deleted`)
        }
    }

    )

    return { DeleteBooking, isDeleting }
}