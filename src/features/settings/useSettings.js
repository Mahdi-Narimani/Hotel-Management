import { useQuery } from "react-query";
import { getSettings } from '../../services/apiSettings';

export const useSettings = () =>
{
    const { isLoading, error, data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    })

    console.log(settings)
    return { isLoading, error, settings }
}