import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { updateBooking } from '../../services/apiBookings'


export const useCheckout = () =>
{

    const queryClient = useQueryClient();

    const { mutate: checkout, isLoading: isCheckout } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: 'checked-out'
        }),
        onSuccess: (data) =>
        {
            toast.success(`Booking #${data.id} successfully Check Out`);
            queryClient.invalidateQueries({ active: true });
        }
    })

    return { checkout, isCheckout };
}