import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { creditAdjustToChild } from "../../../../stores/actions/superDistributorAction";
import { getUserByIdAsync } from '../../../../stores/actions/authActions';
import useFetchSuperDistributorchildrenById from "./useFetchSuperDistributorchildrenById";
import { loadcredit } from '../../../../stores/actions/creditActions';


export default function useSuperDistributorChildrenCreditAdjust({ any, id }) {

    // console.log(any, id );
    const dispatch = useDispatch();
    const { childrenInfo } = useFetchSuperDistributorchildrenById({ any, id });
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { authUser } = useSelector((state) => state.auth);
    const [showCreditAdjustMessage, setShowCreditAdjustMessage] = useState(null);
    const [isCreditAdjustLoading, setIsCreditAdjustLoading] = useState(false);
    const [showCreditAdjustError, setShowCreditAdjustError] = useState(null);
    const { childrenError } = useSelector((state) => state.superdistributor);

    const { credit } = useSelector((state) => state.credit);
        // Automatically clear success/error messages after 3 seconds
    
        useEffect(() => {
            dispatch(loadcredit(id));
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
            await dispatch(creditAdjustToChild({ any, id, requestData })).unwrap();
            await dispatch(getUserByIdAsync(authUser._id)).unwrap();
            setShowCreditAdjustMessage("Credit adjustment successful!");
            reset();
        } catch (err) {
            console.error("Error during credit adjustment:", err);
            const errorMessage = childrenError || err?.response?.data?.message || err?.message || "An error occurred.";
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
        childrenInfo,
        authUser,
        showCreditAdjustMessage,
        showCreditAdjustError,
        errors,
        credit
    };
}
