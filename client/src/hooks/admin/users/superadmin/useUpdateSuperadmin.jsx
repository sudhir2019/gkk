import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useFetchAdminById from "./useFetchSuperadminById";
import { useFetchGames } from "../../games/useFetchGames";
import { updateAdmin } from '../../../../stores/actions/adminActions';

const useUpdateAdmin = (adminId) => {
    const dispatch = useDispatch();
    const { admin } = useFetchAdminById(adminId);  // Use Redux state
    const { games, fetchAllGames } = useFetchGames();
    const [showUpdateMessage, setShowUpdateMessage] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(null);

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        getValues
    } = useForm();

    useEffect(() => {
        fetchAllGames();
    }, []);

    // Prefill form when admin data is available
    useEffect(() => {
        if (admin) {
            reset({
                username: admin.username || "",
                refId: admin.refId?._id || "",
                userStatus: admin.userStatus ? "true" : "false",
                commission: admin.commission ?? "",
                note: admin.note ?? "",
                games: admin.games?.map(g => g._id) || [],
            });
        }
    }, [admin, reset]);

    // Extract only updated values before sending
    const getUpdatedValues = () => {
        const formValues = getValues();
        const updatedValues = {};

        Object.keys(formValues).forEach((key) => {
            let formValue = formValues[key];

            if (key === "userStatus") {
                formValue = formValue === "true"; // Convert to boolean
            }

            if (formValue !== undefined && formValue !== admin[key]) {
                updatedValues[key] = formValue;
            }
        });

        return updatedValues;
    };

    const onSubmit = async () => {
        const updatedFields = getUpdatedValues();

        if (Object.keys(updatedFields).length === 0) {
            console.log("No changes detected.");
            return;
        }

        console.log(updatedFields)
        setIsUpdateLoading(true);
        try {
            await dispatch(updateAdmin({ userData: updatedFields, id: adminId })).unwrap();
            setShowUpdateMessage("User updated successfully!");
            setTimeout(() => window.history.back(), 1000);
        } catch (error) {
            setShowUpdateError("Error updating Admin user: " + error);
        } finally {
            setIsUpdateLoading(false);
        }
    };

    useEffect(() => {
        if (showUpdateMessage || showUpdateError) {
            const timer = setTimeout(() => {
                setShowUpdateMessage(null);
                setShowUpdateError(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showUpdateMessage, showUpdateError]);

    return {
        register,
        handleSubmit,
        onSubmit,
        isUpdateLoading,
        watch,
        setValue,
        games,
        showUpdateMessage,
        showUpdateError,
        errors,
    };
};

export default useUpdateAdmin;
