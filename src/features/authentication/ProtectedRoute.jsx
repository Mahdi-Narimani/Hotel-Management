import PropTypes from 'prop-types'
import { useUser } from './useUser';
import { useNavigate } from 'react-router-dom'

import Spinner from '../../ui/Spinner'
import styled from 'styled-components'
import { useEffect } from 'react'

const FullPage = styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
justify-content: center;
align-items: center;
`

const ProtectedRoute = ({ children }) =>
{

    const navigate = useNavigate()

    // 1. Load the authenticated user
    const { isLoading, isAuthenticated } = useUser();


    // 2. If there is NO authenticated user, redirect to the '/login'
    useEffect(() =>
    {
        if (!isAuthenticated && !isLoading)
        {
            navigate('/login')
        }
    }, [isAuthenticated, isLoading, navigate])

    // 3. While Loading, show a spinner
    if (isLoading)
    {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        )
    }

    // 4. If there IS a user, render the app
    if (isAuthenticated) return children
}


ProtectedRoute.propTypes = {
    children: PropTypes.node
}

export default ProtectedRoute