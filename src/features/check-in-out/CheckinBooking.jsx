import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import PropType from 'prop-types';

import { useCheckin } from './useCheckin';
import { useBooking } from '../bookings/useBooking';
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from '../settings/useSettings';

import { formatCurrency } from '../../utils/helpers';

import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from '../../ui/Spinner';

import styled from "styled-components";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking()
{
  const navigate = useNavigate()

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { data: booking, isLoading } = useBooking();

  const { checkin, isCheckin } = useCheckin();

  const { settings, isLoading: isSetting } = useSettings();

  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  // const {
  //   id: bookingId,
  //   guests,
  //   totalPrice,
  //   numGuests,
  //   hasBreakfast,
  //   numNights,
  // } = booking;

  const optionalBreakfastPrice = settings?.breakfastPrice * booking?.numGuests * booking?.numNights;

  function handleCheckin()
  {
    if (!confirmPaid) return;

    if (addBreakfast)
    {
      checkin({
        bookingId: booking.id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: booking?.totalPrice + optionalBreakfastPrice
        }
      })
    }
    else
    {
      checkin({ bookingId: booking.id, breakfast: {} });
    }
    navigate('/bookings?status=checked-in&page=1')
  }

  
  
  const price = !addBreakfast ? formatCurrency(booking?.totalPrice) : `${formatCurrency(booking?.totalPrice + optionalBreakfastPrice)} (${formatCurrency(booking?.totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`;
  
  if (isLoading || isSetting) return <Spinner />
  
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            id='breakfast'
            checked={addBreakfast}
            onChange={() =>
            {
              setAddBreakfast(add => !add)
              setConfirmPaid(false);
            }}
          >
            want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )
      }


      <Box>
        <Checkbox
          disabled={confirmPaid || isCheckin}
          checked={confirmPaid}
          onChange={() => setConfirmPaid(confirm => !confirm)}
        >
          I confirm  that {booking.guests.fullName} has paid the total amount of {price}
        </Checkbox>
      </Box>


      <ButtonGroup>

        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid}>
          Check in booking #{booking?.id}
        </Button>

        <Button
          variation="secondary"
          onClick={moveBack}>
          Back
        </Button>

      </ButtonGroup>
    </>
  );
}

CheckinBooking.propTypes = {
  booking: PropType.object
}

export default CheckinBooking;
