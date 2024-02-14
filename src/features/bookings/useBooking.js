import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getBooking } from '../../services/apiBookings';

export const useBooking = () =>
{
    const { bookingId } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId)
    });

    return { data, isLoading }
}