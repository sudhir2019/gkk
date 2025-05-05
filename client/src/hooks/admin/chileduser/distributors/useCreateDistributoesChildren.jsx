import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createdistributorChild } from "../../../../stores/actions/distributorAction";
import { Country, State, City } from "country-state-city";

const useCreateDistributoesChildren = (adminParent) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            userStatus: true,   // Default to boolean
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

    const onSubmit = async (childAdminData) => {
        setIsCreateLoading(true);
        const parentAdminId = adminParent?._id;
        try {
            await dispatch(createdistributorChild({ childAdminData, parentAdminId })).unwrap();
            setShowCreateMessage("User created successfully!");

            setTimeout(() => navigate(-1), 1000);
            reset();
        } catch (err) {
            const superdistributorsCreateError = err?.response?.data?.message || err?.message || "Failed to create superdistributors.";
            setShowCreateError(superdistributorsCreateError);
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
        adminParent,
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

export default useCreateDistributoesChildren;
