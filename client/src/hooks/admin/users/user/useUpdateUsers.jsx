import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Country, State, City } from "country-state-city";
import { useEffect, useState, useMemo } from 'react';
import useFetchUsersById from "./useFetchUsersById";
import { updateusers } from '../../../../stores/actions/userAction';
import useFetchAllRetailers from '../retailers/useFetchAllRetailers';

const useUpdateuser = (usersId) => {
    const dispatch = useDispatch();
    const { user } = useFetchUsersById(usersId);  // Fetch users data
    const { retailers } = useFetchAllRetailers();
    const [showUpdateMessage, setShowUpdateMessage] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(null);
    const { userError } = useSelector((state) => state.user);
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
        if (user) {
          
                const formatDateForInput = (dateString) => {
                    if (!dateString) return '';
                    const date = new Date(dateString);
                    // Format date as YYYY-MM-DD for date input
                    return date.toISOString().split('T')[0];
                };
    
                reset({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    // Ensure date is properly formatted
                    dateOfBirth: formatDateForInput(user.dateOfBirth),
                    country: user.country || "",
                    // Use the actual state value from admin data
                    state: user.state || "",
                    city: user.city || "",
                    refId: user.refId?._id || "",
                    pinCode: user.pinCode || "",
                    address: user.address || "",
                    pin: user.pin || "",
                    password: user.password || "",
                    occupation: user.occupation || "",
                    note: user.note ?? "add notes",
                    userStatus: user.userStatus === true ? "true" : "false",
                });
                setSelectedCountry(user.country || "");
                setSelectedState(user.state || "");
                setSelectedCity(user.city || "");
            }
    }, [user, reset]);

  // Extract only updated values before sending
  const getUpdatedValues = () => {
    const formValues = getValues();
    const updatedValues = {};

    Object.keys(formValues).forEach((key) => {
        let formValue = formValues[key];

        // ✅ Handle date comparison correctly
        if (key === 'dateOfBirth') {
            const adminDate = user.dateOfBirth
                ? new Date(user.dateOfBirth).toISOString().split('T')[0]
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
            if (boolValue !== user.userStatus) {
                updatedValues[key] = boolValue;
            }
            return;
        }

        // ✅ Handle password updates correctly
        if (key === "password") {
            if (formValue && formValue !== user[key]) {
                updatedValues[key] = formValue;
            }
            return;
        }

        // ✅ Check if any other field has changed
        if (formValue !== undefined && formValue !== user[key]) {
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
            const usersUpdateerror = userError || error.message || "server error";
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

export default useUpdateuser;
