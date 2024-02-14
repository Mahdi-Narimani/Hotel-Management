import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { subDays } from 'date-fns';
import { getBookingsAfterDate } from '../../services/apiBookings';

export const useRecentBookings = () =>
{

    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get('last')
        ? 7
        : Number(searchParams.get('last'));

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data:bookings } = useQuery({
        queryKey: ['bookings', `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate)
    })

    return { isLoading, bookings };
}