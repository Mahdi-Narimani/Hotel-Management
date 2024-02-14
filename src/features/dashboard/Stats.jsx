import { formatCurrency } from '../../utils/helpers';
import PropType from 'prop-types';

import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'

const Stats = ({ bookings, confirmedStays, cabinsCount, numDays }) =>
{

    // 1. num bookings
    const numBookings = bookings.length;

    // 2. sales 
    const sales = bookings.reduce((acc, curVal) => acc + curVal.totalPrice, 0)

    // 3. checkIns
    const checkins = confirmedStays.length;

    // 4.
    const occupation = Math.round(confirmedStays.reduce((acc, curVal) => acc + curVal.numNights, 0) / (numDays * cabinsCount) * 100)

    return (
        <>
            <Stat
                icon={<HiOutlineBriefcase />}
                title='Bookings'
                value={numBookings}
                color='blue'
            />
            <Stat
                icon={<HiOutlineBanknotes />}
                title='Sales'
                value={formatCurrency(sales)}
                color='green'
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                title='Check ins'
                value={checkins}
                color='indigo'
            />
            <Stat
                icon={<HiOutlineChartBar />}
                title='Occupancy rate'
                value={occupation + '%'}
                color='yellow'
            />
        </>
    )
}

Stats.propTypes = {
    bookings: PropType.array,
    confirmedStays: PropType.array,
    cabinsCount: PropType.number,
    numDays: PropType.number
}

export default Stats