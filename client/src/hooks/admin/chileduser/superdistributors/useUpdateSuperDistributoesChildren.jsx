import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Country, State, City } from "country-state-city";
import { useEffect, useState, useMemo } from 'react';
import useFetchDistributorById from "../../users/distributors/useFetchDistributorById";
import { updatesuperdistributorsChild } from '../../../../stores/actions/superDistributorAction';
import useFetchAllSuperDistributor from '../../users/superdistributors/useFetchAllSuperDistributor';

const useUpdateSuperDistributoesChildren = ({ any, id }) => {
    const dispatch = useDispatch();
    const { distributor } = useFetchDistributorById(id);  // Fetch SuperDistributors data
    const { superdistributors } = useFetchAllSuperDistributor();
    const [showUpdateMessage, setShowUpdateMessage] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(null);
    const { childrenError } = useSelector((state) => state.superdistributor);
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
        if (distributor) {

            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                // Format date as YYYY-MM-DD for date input
                return date.toISOString().split('T')[0];
            };

            reset({
                firstName: distributor.firstName || "",
                lastName: distributor.lastName || "",
                email: distributor.email || "",
                phone: distributor.phone || "",
                // Ensure date is properly formatted
                dateOfBirth: formatDateForInput(distributor.dateOfBirth),
                country: distributor.country || "",
                // Use the actual state value from admin data
                state: distributor.state || "",
                city: distributor.city || "",
                refId: distributor.refId?._id || "",
                pinCode: distributor.pinCode || "",
                address: distributor.address || "",
                pin: distributor.pin || "",
                password: distributor.password || "",
                occupation: distributor.occupation || "",
                commission: distributor.commission ?? 0,
                note: distributor.note ?? "add notes",
                userStatus: distributor.userStatus === true ? "true" : "false",
            });
            setSelectedCountry(distributor.country || "");
            setSelectedState(distributor.state || "");
            setSelectedCity(distributor.city || "");
        }
    }, [distributor, reset]);

    // Extract only updated values before sending
    const getUpdatedValues = () => {
        const formValues = getValues();
        const updatedValues = {};

        Object.keys(formValues).forEach((key) => {
            let formValue = formValues[key];

            // ✅ Handle date comparison correctly
            if (key === 'dateOfBirth') {
                const adminDate = distributor.dateOfBirth
                    ? new Date(distributor.dateOfBirth).toISOString().split('T')[0]
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
                if (boolValue !== distributor.userStatus) {
                    updatedValues[key] = boolValue;
                }
                return;
            }

            // ✅ Handle password updates correctly
            if (key === "password") {
                if (formValue && formValue !== distributor[key]) {
                    updatedValues[key] = formValue;
                }
                return;
            }

            // ✅ Check if any other field has changed
            if (formValue !== undefined && formValue !== distributor[key]) {
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
            await dispatch(updatesuperdistributorsChild({ parentAdminId, superdistributorsId, updatedFields })).unwrap();
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
        superdistributors,
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

export default useUpdateSuperDistributoesChildren;
