import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropType from 'prop-types';

import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkModeContext'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


const SalesChart = ({ bookings, numDays }) =>
{

  const { darkMode } = useDarkMode();

  const colors = darkMode
    ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  })

  const data = allDates.map(date =>
  {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0)
    }
  })

  return (
    <StyledSalesChart>
      <Heading as='h2'>Sales from {format(allDates.at(0), 'MMM dd yyyy')}  &mdash; {format(allDates.at(-1), 'MMM dd yyyy')}</Heading>
      <ResponsiveContainer ResponsiveContainer width='100%' height={300} >
        <AreaChart data={data} >

          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
          />

          <CartesianGrid strokeDasharray={4} />

          <Area
            type='monotone'
            strokeWidth={2}
            unit='$'
            name='Total Sales'
            dataKey='totalSales'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
          />

          <Area
            type='monotone'
            strokeWidth={2}
            unit='$'
            name='Extras Sales'
            dataKey='extrasSales'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

SalesChart.propTypes = {
  bookings: PropType.array,
  numDays: PropType.number
}

export default SalesChart