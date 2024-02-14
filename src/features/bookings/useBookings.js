import { useQuery, useQueryClient } from 'react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export const useBookings = () =>
{
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // 1. Filter
    const filterValue = searchParams.get('status') || 'all';
    const filter = !filterValue || filterValue === 'all'
        ? null
        : { field: 'status', value: filterValue };

    // 2. Sort
    const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByValue.split('-');
    const sortBy = { field, direction };

    // 3. Pagination
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));


    // Query
    const { data: { data: bookings, count } = {},
        error,
        isLoading
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page })
    })

    // Pre-Fetching
    const pageCount = Math.ceil(count / PAGE_SIZE)

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        })

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        })

    return { bookings, error, isLoading, count };
}