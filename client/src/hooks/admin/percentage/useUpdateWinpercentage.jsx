import useGamepercentageByAdmin from '../../../hooks/admin/percentage/useGamepercentageByAdmin';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateWinpercentageBulk } from "../../../stores/actions/percentageActions";

const useUpdateWinpercentage = () => {
    const dispatch = useDispatch();
    const { id, percentagelist, percentageMessage, percentageLoading } = useGamepercentageByAdmin();
    const { register, handleSubmit, setValue, getValues, formState: { isSubmitting } } = useForm();

    const [winPercentageloading, setWinPercentageloading] = useState(null);
    const [changedValues, setChangedValues] = useState({});
    const [percentageError, setPercentageError] = useState(null);
    const [percentageSuccess, setPercentageSuccess] = useState(null);

    // ✅ Prefill form inputs when data is fetched
    useEffect(() => {
        if (percentagelist && percentagelist.length > 0) {
            percentagelist.forEach(obj => {
                setValue(`winPercentages.${obj.id}`, obj.winpercentage || "");
            });
        }
    }, [percentagelist, setValue]);

    // ✅ Track changes in inputs
    const handleInputChange = (id, value) => {
        setChangedValues(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    // ✅ Bulk update only changed values
    const updateChangedPercentages = async () => {
        setWinPercentageloading(true);

        if (Object.keys(changedValues).length === 0) {
            setWinPercentageloading(false);
            return;
        }

        try {
            const updates = Object.entries(changedValues).map(([id, winpercentage]) => ({
                id,
                winpercentage: isNaN(Number(winpercentage)) ? 0 : Number(winpercentage),
            }));

            const data = { updates };

            // Await dispatch
            const res = await dispatch(updateWinpercentageBulk({ id, data }));

            // Extract success message safely
            const successMessage =
                res?.payload?.message || res?.message || percentageMessage || "Updated successfully";

            setPercentageSuccess(successMessage);
            setPercentageError(null);
            setChangedValues({});

            setTimeout(() => {
                setPercentageSuccess(null);
            }, 800);
        } catch (error) {
            setPercentageError(error.message || "An error occurred");
            setPercentageSuccess(null);

            setTimeout(() => {
                setPercentageError(null);
            }, 800);
        } finally {
            setWinPercentageloading(false);
        }
    };

    return {
        register,
        handleSubmit,
        isSubmitting,
        winPercentageloading,
        percentagelist,
        percentageLoading,
        changedValues,
        handleInputChange,
        getValues,
        percentageSuccess,
        percentageError,
        updateChangedPercentages,
    };
};

export default useUpdateWinpercentage;
