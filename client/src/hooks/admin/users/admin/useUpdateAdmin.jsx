import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import { useFetchGames } from "../../games/useFetchGames";
import useFetchAllSuperAdmins from "../superadmin/useFetchAllSuperadmin";
import useFetchAdminById from "./useFetchAdminById";
import { updateAdmin } from "../../../../stores/actions/adminActions";
import { Country, State, City } from "country-state-city";

const useUpdateAdmin = (adminId) => {
    const dispatch = useDispatch();

    // Fetch admin data, games, and superadmins
    const { admin } = useFetchAdminById(adminId);
    const { superadmins } = useFetchAllSuperAdmins();
    const { games, fetchAllGames } = useFetchGames();
    const { adminError } = useSelector((state) => state.admins);

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

    // Fetch games on component mount
    useEffect(() => {
        fetchAllGames();
    }, []);

    // Prefill form with admin data when available

    useEffect(() => {
        if (admin) {
            // Convert date to correct format for date input
            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                // Format date as YYYY-MM-DD for date input
                return date.toISOString().split('T')[0];
            };

            reset({
                firstName: admin.firstName || "",
                lastName: admin.lastName || "",
                email: admin.email || "",
                phone: admin.phone || "",
                // Ensure date is properly formatted
                dateOfBirth: formatDateForInput(admin.dateOfBirth),
                country: admin.country || "",
                // Use the actual state value from admin data
                state: admin.state || "",
                city: admin.city || "",
                refId: admin.refId?._id || "",
                pinCode: admin.pinCode || "",
                address: admin.address || "",
                pin: admin.pin || "",
                password: admin.password || "",
                occupation: admin.occupation || "",
                commission: admin.commission ?? 0,
                note: admin.note ?? "add notes",
                userStatus: admin.userStatus === true ? "true" : "false",
                games: admin.games?.map((g) => g._id) || [],
            });

            // Ensure country and state are set correctly
            setSelectedCountry(admin.country || "");
            setSelectedState(admin.state || "");
            setSelectedCity(admin.city || "");
        }
    }, [admin, reset]);

    // Ensure getUpdatedValues compares correctly
    const getUpdatedValues = () => {
        const formValues = getValues();
        const updatedValues = {};

        Object.keys(formValues).forEach((key) => {
            let formValue = formValues[key];

            // Special handling for date of birth to compare correctly
            if (key === 'dateOfBirth') {
                const adminDate = admin.dateOfBirth
                    ? new Date(admin.dateOfBirth).toISOString().split('T')[0]
                    : '';
                const formDate = formValue ? new Date(formValue).toISOString().split('T')[0] : '';

                if (formDate !== adminDate) {
                    updatedValues[key] = formValue;
                }
                return;
            }

            if (key === "userStatus") {
                // Convert back to boolean for comparison and update
                const boolValue = formValue === "true";
                if (boolValue !== admin.userStatus) {
                    updatedValues[key] = boolValue;
                }
                return;
            }
            if (key === "password") {
                if (formValue !== undefined && formValue !== "") {
                    updatedValues[key] = formValue;
                }
            } else if (key === "games") {
                const originalGameIds = admin?.games?.map((g) => g._id) || [];
                if (JSON.stringify(formValue) !== JSON.stringify(originalGameIds)) {
                    updatedValues[key] = formValue;
                }
            } else if (formValue !== undefined && formValue !== admin[key]) {
                updatedValues[key] = formValue;
            }
        });
        return updatedValues;
    };

    const onSubmit = async () => {
        const updatedFields = getUpdatedValues();

        if (Object.keys(updatedFields).length === 0) {
            return; // No changes detected
        }

        setIsUpdateLoading(true);
        try {
            await dispatch(updateAdmin({ adminId, updatedFields })).unwrap();
            setShowUpdateMessage("Admin updated successfully!");
            setTimeout(() => window.history.back(), 1000);
        } catch (error) {
            const adminUpdateError = adminError || error.message || "Server error";
            setShowUpdateError(adminUpdateError);
        } finally {
            setIsUpdateLoading(false);
        }
    };

    // Automatically clear messages after a delay
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
        superadmins,
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

export default useUpdateAdmin;