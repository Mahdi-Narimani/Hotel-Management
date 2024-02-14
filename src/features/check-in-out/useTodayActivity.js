import { useQuery } from 'react-query'
import { getStaysTodayActivity } from '../../services/apiBookings'


export const useTodyActivity = () =>
{
    const { data, isLoading } = useQuery({
        queryKey: ['today-activity'],
        queryFn: getStaysTodayActivity
    })
    console.log(data)
    return { data, isLoading }
}