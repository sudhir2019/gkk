import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Country, State, City } from "country-state-city";
import { useEffect, useState, useMemo } from 'react';
import useFetchRetailerchildrenById from "./useFetchRetailerchildrenById";
import { updateretailersChild } from '../../../../stores/actions/retailerAction';
import useFetchAllRetailers from '../../users/retailers/useFetchAllRetailers';

const useUpdateRetailerChildren = ({ any, id }) => {
    const dispatch = useDispatch();
    const { childrenInfo } = useFetchRetailerchildrenById({ any, id });  // Fetch SuperDistributors data
    const { retailers } = useFetchAllRetailers();
    const [showUpdateMessage, setShowUpdateMessage] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(null);
    const { childrenError } = useSelector((state) => state.retailer);
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
        if (childrenInfo) {

            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                // Format date as YYYY-MM-DD for date input
                return date.toISOString().split('T')[0];
            };

            reset({
                firstName: childrenInfo.firstName || "",
                lastName: childrenInfo.lastName || "",
                email: childrenInfo.email || "",
                phone: childrenInfo.phone || "",
                // Ensure date is properly formatted
                dateOfBirth: formatDateForInput(childrenInfo.dateOfBirth),
                country: childrenInfo.country || "",
                // Use the actual state value from admin data
                state: childrenInfo.state || "",
                city: childrenInfo.city || "",
                refId: childrenInfo.refId?._id || "",
                pinCode: childrenInfo.pinCode || "",
                address: childrenInfo.address || "",
                pin: childrenInfo.pin || "",
                password: childrenInfo.password || "",
                occupation: childrenInfo.occupation || "",
                note: childrenInfo.note ?? "add notes",
                userStatus: childrenInfo.userStatus === true ? "true" : "false",
            });
            setSelectedCountry(childrenInfo.country || "");
            setSelectedState(childrenInfo.state || "");
            setSelectedCity(childrenInfo.city || "");
        }
    }, [childrenInfo, reset]);

    // Extract only updated values before sending
    const getUpdatedValues = () => {
        const formValues = getValues();
        const updatedValues = {};

        Object.keys(formValues).forEach((key) => {
            let formValue = formValues[key];

            // ✅ Handle date comparison correctly
            if (key === 'dateOfBirth') {
                const adminDate = childrenInfo.dateOfBirth
                    ? new Date(childrenInfo.dateOfBirth).toISOString().split('T')[0]
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
                if (boolValue !== childrenInfo.userStatus) {
                    updatedValues[key] = boolValue;
                }
                return;
            }

            // ✅ Handle password updates correctly
            if (key === "password") {
                if (formValue && formValue !== childrenInfo[key]) {
                    updatedValues[key] = formValue;
                }
                return;
            }

            // ✅ Check if any other field has changed
            if (formValue !== undefined && formValue !== childrenInfo[key]) {
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
            await dispatch(updateretailersChild({ parentAdminId, superdistributorsId, updatedFields })).unwrap();
            // console.log("✅ API Success:", updatedFields);
            setShowUpdateMessage("User updated successfully!");
            setTimeout(() => window.history.back(), 1000);
        } catch (error) {
            // console.error("❌ API Error:", error);
            const SuperDistributorsUpdateerror = childrenError || error.message || "server error";
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
        retailers,
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
        cities
    };
};

export default useUpdateRetailerChildren;
