import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { updateBooking } from '../../services/apiBookings';

import toast from 'react-hot-toast'

export const useCheckin = () =>
{

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isLoading: isCheckin } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
            ...breakfast
        }),

        onSuccess: (data) =>
        {
            toast.success(`Booking #${data.id} successfully check in`);
            queryClient.invalidateQueries({ active: true });
            navigate('/bookings?status=checked-in');
        }
    })

    return { checkin, isCheckin }
}