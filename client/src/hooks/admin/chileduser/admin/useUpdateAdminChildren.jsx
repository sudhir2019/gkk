import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useMemo } from 'react';
import useFetchSuperDistributorsById from "../../users/superdistributors/useFetchSuperDistributorById";
import { updateAdminChild } from '../../../../stores/actions/adminActions';
import useFetchAllAdmins from '../../users/admin/useFetchAllAdmins';
import { Country, State, City } from "country-state-city";
const useUpdateAdminChildren = ({ any, id }) => {
    const dispatch = useDispatch();
    const { superdistributor } = useFetchSuperDistributorsById(id);  // Fetch SuperDistributors data
    const { admins } = useFetchAllAdmins();
    const [showUpdateMessage, setShowUpdateMessage] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(null);
    const { SuperDistributorsError } = useSelector((state) => state.superdistributor);
    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        getValues
    } = useForm();
    // Country, State, City state
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    // Get all countries
    const countries = useMemo(() => Country.getAllCountries(), []);

    // Get states based on selected country
    const states = useMemo(() => {
        return selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
    }, [selectedCountry]);

    // Get cities based on selected country and state
    const cities = useMemo(() => {
        return selectedCountry && selectedState
            ? City.getCitiesOfState(selectedCountry, selectedState)
            : [];
    }, [selectedCountry, selectedState]);

    // Handle country change
    const handleCountryChange = (countryCode) => {
        setSelectedCountry(countryCode);
        setSelectedState("");
        setSelectedCity("");
        setValue("country", countryCode);
        setValue("state", "");
        setValue("city", "");
    };

    // Handle state change
    const handleStateChange = (stateCode) => {
        setSelectedState(stateCode);
        setSelectedCity("");
        setValue("state", stateCode);
        setValue("city", "");
    };

    // Handle city change
    const handleCityChange = (cityName) => {
        setSelectedCity(cityName);
        setValue("city", cityName);
    };
    // Prefill form when SuperDistributors data is available
    useEffect(() => {
        if (superdistributor) {
            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                // Format date as YYYY-MM-DD for date input
                return date.toISOString().split('T')[0];
            };

            reset({
                firstName: superdistributor.firstName || "",
                lastName: superdistributor.lastName || "",
                email: superdistributor.email || "",
                phone: superdistributor.phone || "",
                // Ensure date is properly formatted
                dateOfBirth: formatDateForInput(superdistributor.dateOfBirth),
                country: superdistributor.country || "",
                // Use the actual state value from admin data
                state: superdistributor.state || "",
                city: superdistributor.city || "",
                refId: superdistributor.refId?._id || "",
                pinCode: superdistributor.pinCode || "",
                address: superdistributor.address || "",
                pin: superdistributor.pin || "",
                password: superdistributor.password || "",
                occupation: superdistributor.occupation || "",
                commission: superdistributor.commission ?? 0,
                note: superdistributor.note ?? "add notes",
                userStatus: superdistributor.userStatus === true ? "true" : "false",
            });
            setSelectedCountry(superdistributor.country || "");
            setSelectedState(superdistributor.state || "");
            setSelectedCity(superdistributor.city || "");
        }
    }, [superdistributor, reset]);


    // Extract only updated values before sending
    const getUpdatedValues = () => {
        const formValues = getValues();
        const updatedValues = {};

        Object.keys(formValues).forEach((key) => {
            let formValue = formValues[key];

            // ✅ Handle date comparison correctly
            if (key === 'dateOfBirth') {
                const adminDate = superdistributor.dateOfBirth
                    ? new Date(superdistributor.dateOfBirth).toISOString().split('T')[0]
                    : '';
                const formDate = formValue ? new Date(formValue).toISOString().split('T')[0] : '';

                if (formDate !== adminDate) {
                    updatedValues[key] = formValue;
                }
                return;
            }

            // ✅ Convert "userStatus" to boolean before comparison
            if (key === "userStatus") {
                const boolValue = formValue === "true";
                if (boolValue !== superdistributor.userStatus) {
                    updatedValues[key] = boolValue;
                }
                return;
            }

            // ✅ Handle password updates correctly
            if (key === "password") {
                if (formValue && formValue !== superdistributor[key]) {
                    updatedValues[key] = formValue;
                }
                return;
            }

            // ✅ Check if any other field has changed
            if (formValue !== undefined && formValue !== superdistributor[key]) {
                updatedValues[key] = formValue;
            }
        });

        return updatedValues;
    };

    const onSubmit = async () => {
        const updatedFields = getUpdatedValues();
        // console.log("📝 Updated Fields:", updatedFields);

        if (Object.keys(updatedFields).length === 0) {
            // console.log("⚠️ No changes detected.");
            return;
        }

        setIsUpdateLoading(true);
        const superdistributorsId = id;
        const parentAdminId = any;
        try {
            await dispatch(updateAdminChild({ parentAdminId, superdistributorsId, updatedFields })).unwrap();
            // console.log("✅ API Success:", updatedFields);
            setShowUpdateMessage("User updated successfully!");
            setTimeout(() => window.history.back(), 1000);
        } catch (error) {
            // console.error("❌ API Error:", error);
            const SuperDistributorsUpdateerror = SuperDistributorsError || error.message || "server error";
            setShowUpdateError(SuperDistributorsUpdateerror);
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
        admins,
        showUpdateMessage,
        showUpdateError,
        errors,
        selectedCountry,
        selectedState,
        selectedCity,
        handleCountryChange,
        handleStateChange,
        handleCityChange,
        countries,
        states,
        cities,
    };
};

export default useUpdateAdminChildren;
