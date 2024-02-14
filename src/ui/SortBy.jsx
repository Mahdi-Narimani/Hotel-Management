import { useSearchParams } from "react-router-dom"
import PropType from 'prop-types'

import Select from "./Select"

const SortBy = ({ options }) =>
{
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || '';

    const handleChange = (e) =>
    {
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);
    }

    return <Select
        value={sortBy}
        options={options}
        type='white'
        onChange={handleChange}
    />
}

SortBy.propTypes = {
    options: PropType.array
}

export default SortBy