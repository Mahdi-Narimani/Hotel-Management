import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import { useDarkMode } from "../context/DarkModeContext"

const DarkModeToggle = () =>
{

    const { toggleDarkMode, darkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    )
}

export default DarkModeToggle