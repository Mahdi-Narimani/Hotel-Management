import { useEffect, useRef } from "react";

export const useClickOutside = (handler, listenCapturing = true) =>
{
    const modalRef = useRef();
    useEffect(() =>
    {
        const handleClose = (e) =>
        {
            if (modalRef.current && !modalRef.current.contains(e.target))
                handler()
        }
        document.addEventListener('click', handleClose, listenCapturing);

        return () => document.removeEventListener('click', handleClose, listenCapturing);

    }, [handler, listenCapturing])

    return modalRef

}