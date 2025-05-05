import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createretailers } from "../../../../stores/actions/retailerAction";
import useFetchAllDistributor from "../distributors/useFetchAllDistributor";
import { Country, State, City } from "country-state-city";
const useCreateRretailers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { retailerError } = useSelector((state) => state.retailer);
    const { distributors } = useFetchAllDistributor();
    const [showCreateMessage, setShowCreateMessage] = useState(null);
    const [isCreateLoading, setIsCreateLoading] = useState(false);
    const [showCreateError, setShowCreateError] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dateOfBirth: "",
            country: "",
            state: "",
            city: "",
            refId: "",
            pinCode: "",
            address: "",
            pin: "",
            password: "",
            occupation: "",
            commission: 0,
            note: "add notes",
            userStatus: true,  // Default to boolean
        },
    });
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
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
    const onSubmit = async (data) => {
        setIsCreateLoading(true);
        try {
            await dispatch(createretailers({ ...data })).unwrap();
            setShowCreateMessage("User created successfully!");

            setTimeout(() => navigate(-1), 1000);
            reset();
        } catch (err) {
            const RetailersCreateError = retailerError || err?.response?.data?.message || err?.message || "Failed to create master.";
            setShowCreateError(RetailersCreateError);
        } finally {
            setIsCreateLoading(false);
        }
    };
    useEffect(() => {
        if (showCreateMessage || showCreateError) {
            const timer = setTimeout(() => {
                setShowCreateMessage(null);
                setShowCreateError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showCreateMessage, showCreateError]);

    return {
        register,
        distributors,
        handleSubmit,
        onSubmit,
        setValue,
        reset,
        showCreateMessage,
        isCreateLoading,
        showCreateError,
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

export default useCreateRretailers;
