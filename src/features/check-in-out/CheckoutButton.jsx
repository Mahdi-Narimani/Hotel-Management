import PropTypes from 'prop-types'
import { useCheckout } from './useCheckout'
import Button from "../../ui/Button";

function CheckoutButton({ bookingId })
{

  const { checkout, isCheckout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={checkout(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number
}

export default CheckoutButton;
