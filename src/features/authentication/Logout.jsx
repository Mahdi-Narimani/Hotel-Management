import ButtonIcon from "../../ui/ButtonIcon"
import SpinnerMini from '../../ui/SpinnerMini'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from "./useLogout"

const Logout = () =>
{

    const { isLoading, logout } = useLogout();

    return (
        <ButtonIcon disabled={isLoading} onClick={logout}>
            {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    )
}

export default Logout