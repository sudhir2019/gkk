import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createSuperAdmin } from "../../../../stores/actions/superadminAction";

const useCreatesuperadmin = () => {
    const dispatch = useDispatch();
    const { superadminLoading, superadminMessage, superadminError } = useSelector((state) => state.superadmins);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            refId: "",
            commission: 0,
            note: "add notes",
            userStatus: "true",  // Default to active
        },
    });

    // Submit handler
    const onSubmit = async (data) => {
        // console.log(data);
        try {
            await dispatch(
                createSuperAdmin({ ...data })
            ).unwrap();
            reset();
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };


    return {
        register,
        handleSubmit,
        onSubmit,
        setValue,
        reset,
        superadminLoading,
        superadminMessage,
        superadminError,
        errors,
    };
};

export default useCreatesuperadmin;
