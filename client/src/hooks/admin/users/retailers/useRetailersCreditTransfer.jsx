import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { creditTransfer } from "../../../../stores/actions/retailerAction";
import { useState, useEffect } from 'react';
import useFetchretailersById from "./useFetchretailersById";
import { getUserByIdAsync } from '../../../../stores/actions/authActions';
import { loadcredit } from '../../../../stores/actions/creditActions';

export default function useRetailersCreditTransfer(id) {
    const dispatch = useDispatch();
    const { retailer } = useFetchretailersById(id);
    // Setting up react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch states from Redux
    const { authUser } = useSelector((state) => state.auth); // Assuming user is stored in auth state
    const [showCreditMessage, setShowCreditMessage] = useState(null);
    const [isCreditLoading, setIsCreditLoading] = useState(false);
    const [showCreditError, setShowCreditError] = useState(null);
    const { retailerError } = useSelector((state) => state.retailer);

     const { credit, isLoading } = useSelector((state) => state.credit); // Assuming user is stored in au
        
            useEffect(() => {
                dispatch(loadcredit(id)).unwrap();
            }, [id])


    // Automatically clear success/error messages after 3 seconds
    useEffect(() => {
        if (showCreditMessage || showCreditError) {
            const timer = setTimeout(() => {
                setShowCreditMessage(null);
                setShowCreditError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showCreditMessage, showCreditError]);

    // Submission handler
    const onSubmit = async (data) => {
        setIsCreditLoading(true);

        if (!authUser?._id) {
            setShowCreditError("User authentication is missing. Please log in again.");
            setIsCreditLoading(false);
            return;
        }

        const transferAmount = parseFloat(data.transferAmount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            setShowCreditError("Invalid transfer amount. Please enter a valid number.");
            setIsCreditLoading(false);
            return;
        }

        if (!data.password) {
            setShowCreditError("Password is required for credit transfer.");
            setIsCreditLoading(false);
            return;
        }

        try {
            const requestData = {
                userId: credit[0]?._id,
                password: data.password,
                transferAmount,
                toUserId: id,
                authUser:authUser
            };

            await dispatch(creditTransfer(requestData)).unwrap();
            await dispatch(getUserByIdAsync(authUser._id)).unwrap();

            setShowCreditMessage("Credit transfer successful!");
            reset();
        } catch (err) {
            console.error("API Error:", err);
            const errorMessage = retailerError || err?.message || "Unknown error occurred during credit transfer.";
            setShowCreditError(errorMessage);
        } finally {
            setIsCreditLoading(false); // Ensuring this runs in all cases
        }
    };


    return {
        register,
        handleSubmit,
        onSubmit,
        retailer,
        authUser,
        showCreditMessage,
        isCreditLoading,
        showCreditError,
        errors,
        credit
    };
}
