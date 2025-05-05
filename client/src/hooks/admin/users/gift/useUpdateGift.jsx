import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Country, State, City } from "country-state-city";
import { useEffect, useState, useMemo } from 'react';
import useFetchUsersById from "./useFetchGiftById";
import { updateusers } from '../../../../stores/actions/giftActions';
import useFetchAllAdmins from "../admin/useFetchAllAdmins";

const useUpdateuGift = (usersId) => {
    const dispatch = useDispatch();
    const { gift } = useFetchUsersById(usersId);  // Fetch users data
    const { admins } = useFetchAllAdmins();
    const [showUpdateMessage, setShowUpdateMessage] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(null);
    const { giftError } = useSelector((state) => state.gift);
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
    // Prefill form when users data is available
    useEffect(() => {
        if (gift) {
          
                const formatDateForInput = (dateString) => {
                    if (!dateString) return '';
                    const date = new Date(dateString);
                    // Format date as YYYY-MM-DD for date input
                    return date.toISOString().split('T')[0];
                };
    
                reset({
                    firstName: gift.firstName || "",
                    lastName: gift.lastName || "",
                    email: gift.email || "",
                    phone: gift.phone || "",
                    // Ensure date is properly formatted
                    dateOfBirth: formatDateForInput(gift.dateOfBirth),
                    country: gift.country || "",
                    // Use the actual state value from admin data
                    state: gift.state || "",
                    city: gift.city || "",
                    refId: gift.refId?._id || "",
                    pinCode: gift.pinCode || "",
                    address: gift.address || "",
                    pin: gift.pin || "",
                    password: gift.password || "",
                    occupation: gift.occupation || "",
                    note: gift.note ?? "add notes",
                    userStatus: gift.userStatus === true ? "true" : "false",
                });
                setSelectedCountry(gift.country || "");
                setSelectedState(gift.state || "");
                setSelectedCity(gift.city || "");
            }
    }, [gift, reset]);

  // Extract only updated values before sending
  const getUpdatedValues = () => {
    const formValues = getValues();
    const updatedValues = {};

    Object.keys(formValues).forEach((key) => {
        let formValue = formValues[key];

        // ✅ Handle date comparison correctly
        if (key === 'dateOfBirth') {
            const adminDate = gift.dateOfBirth
                ? new Date(gift.dateOfBirth).toISOString().split('T')[0]
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
            if (boolValue !== gift.userStatus) {
                updatedValues[key] = boolValue;
            }
            return;
        }

        // ✅ Handle password updates correctly
        if (key === "password") {
            if (formValue && formValue !== gift[key]) {
                updatedValues[key] = formValue;
            }
            return;
        }

        // ✅ Check if any other field has changed
        if (formValue !== undefined && formValue !== gift[key]) {
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
            await dispatch(updateusers({ usersId, updatedFields })).unwrap();
            // console.log("✅ API Success:", updatedFields);
            setShowUpdateMessage("User updated successfully!");
            setTimeout(() => window.history.back(), 1000);
        } catch (error) {
            // console.error("❌ API Error:", error);
            const usersUpdateerror = giftError || error.message || "server error";
            setShowUpdateError(usersUpdateerror);
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
        cities
    };
};

export default useUpdateuGift;
