import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Country, State, City } from "country-state-city";
import { useEffect, useState, useMemo } from 'react';
import useFetchRetailersById from "./useFetchretailersById";
import { updateretailers } from '../../../../stores/actions/retailerAction';
import useFetchAllDistributor from '../distributors/useFetchAllDistributor';

const useUpdateRetailer = (retailersId) => {
    const dispatch = useDispatch();
    const { retailer } = useFetchRetailersById(retailersId);  // Fetch Retailers data
    const { distributors } = useFetchAllDistributor();
    const [showUpdateMessage, setShowUpdateMessage] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(null);
    const { retailerError } = useSelector((state) => state.retailer);

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
    // Prefill form when Retailers data is available
    useEffect(() => {
        if (retailer) {

            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                // Format date as YYYY-MM-DD for date input
                return date.toISOString().split('T')[0];
            };

            reset({
                firstName: retailer.firstName || "",
                lastName: retailer.lastName || "",
                email: retailer.email || "",
                phone: retailer.phone || "",
                // Ensure date is properly formatted
                dateOfBirth: formatDateForInput(retailer.dateOfBirth),
                country: retailer.country || "",
                // Use the actual state value from admin data
                state: retailer.state || "",
                city: retailer.city || "",
                refId: retailer.refId?._id || "",
                pinCode: retailer.pinCode || "",
                address: retailer.address || "",
                pin: retailer.pin || "",
                password: retailer.password || "",
                occupation: retailer.occupation || "",
                commission: retailer.commission ?? 0,
                note: retailer.note ?? "add notes",
                userStatus: retailer.userStatus === true ? "true" : "false",
            });
            setSelectedCountry(retailer.country || "");
            setSelectedState(retailer.state || "");
            setSelectedCity(retailer.city || "");
        }
    }, [retailer, reset]);

    // Extract only updated values before sending
    const getUpdatedValues = () => {
        const formValues = getValues();
        const updatedValues = {};

        Object.keys(formValues).forEach((key) => {
            let formValue = formValues[key];

            // ✅ Handle date comparison correctly
            if (key === 'dateOfBirth') {
                const adminDate = retailer.dateOfBirth
                    ? new Date(retailer.dateOfBirth).toISOString().split('T')[0]
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
                if (boolValue !== retailer.userStatus) {
                    updatedValues[key] = boolValue;
                }
                return;
            }

            // ✅ Handle password updates correctly
            if (key === "password") {
                if (formValue && formValue !== retailer[key]) {
                    updatedValues[key] = formValue;
                }
                return;
            }

            // ✅ Check if any other field has changed
            if (formValue !== undefined && formValue !== retailer[key]) {
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
        try {
            await dispatch(updateretailers({ retailersId, updatedFields })).unwrap();
            // console.log("✅ API Success:", updatedFields);
            setShowUpdateMessage("User updated successfully!");
            setTimeout(() => window.history.back(), 1000);
        } catch (error) {
            // console.error("❌ API Error:", error);
            const RetailersUpdateerror = retailerError || error.message || "server error";
            setShowUpdateError(RetailersUpdateerror);
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
        distributors,
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

export default useUpdateRetailer;
