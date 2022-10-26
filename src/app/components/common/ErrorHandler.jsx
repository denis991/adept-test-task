import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getError } from '../../store/error'



const ErrorHandler = ({ children }) => {
	const error = useSelector(getError())
	const dispatch = useDispatch()

	useEffect(() => {
		if (error) {
			toast.error(error)
			dispatch(clearErrors())
		}
	})

	return <>{children}</>
}

export default ErrorHandler
