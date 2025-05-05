import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { creditAdjust } from "../../../../stores/actions/retailerAction";
import { getUserByIdAsync } from '../../../../stores/actions/authActions';
import useFetchretailersById from "./useFetchretailersById";
import { loadcredit } from '../../../../stores/actions/creditActions';

export default function useRetailersCreditAdjust(id) {
    const dispatch = useDispatch();
    const { retailer } = useFetchretailersById(id);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { authUser } = useSelector((state) => state.auth);
    const [showCreditAdjustMessage, setShowCreditAdjustMessage] = useState(null);
    const [isCreditAdjustLoading, setIsCreditAdjustLoading] = useState(false);
    const [showCreditAdjustError, setShowCreditAdjustError] = useState(null);
    const { retailerError } = useSelector((state) => state.retailer);

     const { credit, isLoading } = useSelector((state) => state.credit); // Assuming user is stored in au
    
        useEffect(() => {
            dispatch(loadcredit(id)).unwrap();
        }, [id]);


    useEffect(() => {
        if (showCreditAdjustMessage || showCreditAdjustError) {
            const timer = setTimeout(() => {
                setShowCreditAdjustMessage(null);
                setShowCreditAdjustError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showCreditAdjustMessage, showCreditAdjustError]);

    const onSubmit = async (data) => {
        setIsCreditAdjustLoading(true);

        if (!authUser?._id) {
            setShowCreditAdjustError("User authentication is missing. Please log in again.");
            setIsCreditAdjustLoading(false);
            return;
        }

        const adjustAmount = parseFloat(data.transferAmount);
        if (isNaN(adjustAmount) || adjustAmount <= 0) {
            setShowCreditAdjustError("Invalid adjustment amount. Please enter a valid number.");
            setIsCreditAdjustLoading(false);
            return;
        }

        if (!data.password) {
            setShowCreditAdjustError("Password is required for credit adjustment.");
            setIsCreditAdjustLoading(false);
            return;
        }

        const requestData = {
            userId: credit[0]?._id,
            password: data.password,
            adjustAmount,
            transactionType: data.transactionType || "credit",
            toUserId: id,
            authUser:authUser
        };

        try {
            await dispatch(creditAdjust(requestData)).unwrap();
            await dispatch(getUserByIdAsync(authUser._id)).unwrap();
            setShowCreditAdjustMessage("Credit adjustment successful!");
            reset();
        } catch (err) {
            console.error("Error during credit adjustment:", err);
            const errorMessage = retailerError || err?.response?.data?.message || err?.message || "An error occurred.";
            setShowCreditAdjustError(errorMessage);
        } finally {
            setIsCreditAdjustLoading(false);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        isCreditAdjustLoading,
        retailer,
        authUser,
        showCreditAdjustMessage,
        showCreditAdjustError,
        errors,
        credit
    };
}
