import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { creditTransferToChild } from "../../../../stores/actions/superDistributorAction";
import { useState, useEffect } from 'react';
import { getUserByIdAsync } from '../../../../stores/actions/authActions';

import useFetchSuperDistributorchildrenById from "./useFetchSuperDistributorchildrenById";
import { loadcredit } from "../../../../stores/actions/creditActions";
export default function useSuperDistributorChildrenCreditTransfer({ any, id }) {

    // console.log(any,id);
    const dispatch = useDispatch();
    const { childrenInfo } = useFetchSuperDistributorchildrenById({ any, id });
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
    const { childrenError } = useSelector((state) => state.superdistributor);
    const { credit } = useSelector((state) => state.credit);
    // Automatically clear success/error messages after 3 seconds


    useEffect(() => {
        dispatch(loadcredit(id));
    }, [id])
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
        const parentAdminId = any;
        const superdistributorsId = id;
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
            const transferData = {
                userId: credit[0]?._id,
                password: data.password,
                transferAmount,
                toUserId: id,
                authUser:authUser
            };

            await dispatch(creditTransferToChild({ parentAdminId, superdistributorsId, transferData })).unwrap();
            await dispatch(getUserByIdAsync(authUser._id)).unwrap();

            setShowCreditMessage("Credit transfer successful!");
            reset();
        } catch (err) {
            console.error("API Error:", err);
            const errorMessage = childrenError || err?.message || "Unknown error occurred during credit transfer.";
            setShowCreditError(errorMessage);
        } finally {
            setIsCreditLoading(false); // Ensuring this runs in all cases
        }
    };


    return {
        register,
        handleSubmit,
        onSubmit,
        childrenInfo,
        authUser,
        showCreditMessage,
        isCreditLoading,
        showCreditError,
        errors,
        credit
    };
}
