import { useNavigate } from 'react-router-dom'
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';

import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail()
{
  const navigate = useNavigate();

  const { data: booking, isLoading } = useBooking();
  const { DeleteBooking, isDeleting } = useDeleteBooking();
  const { checkout } = useCheckout();
  const moveBack = useMoveBack();

  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading || isDeleting) return <Spinner />

  return (

    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>{booking.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        {
          booking.status === 'unconfirmed' && (
            <Button
              onClick={() => navigate(`/check-in/${booking.id}`)}
            >
              Check In
            </Button>
          )
        }

        {booking.status === 'checked-in' && (
          <Button icon={<HiArrowUpOnSquare />}
            onClick={() =>
            {
              checkout(booking.id);
            }}
          >
            Check Out
          </Button>
        )
        }
        <Modal.Open opens='delete'>
          <Button variation="danger" icon={<HiTrash />} > Delete</Button>
        </Modal.Open><Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='booking'
            disabled={isDeleting}
            onConfirm={() => DeleteBooking(booking.id,{
              onSettled: () => navigate(-1)
            })}
          />
        </Modal.Window>


      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
