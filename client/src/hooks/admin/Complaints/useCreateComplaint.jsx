import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createComplaints } from '../../../stores/actions/complaintsActions';
import { useState } from 'react';
export default function useCreateComplaint(setIsOpen) {
    const dispatch = useDispatch();
    const { isComplaintLoading, complaintError, complaintMassages } = useSelector((state) => state.complaint);
    const [contactMassages, setContactMassages] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            mobile: '',
            enquiryType: '',
            complaintDetails: ''
        }
    });

    // Form submit handler
    const onSubmit = async (data) => {
        try {
            // Dispatch createContact action and await result
            await dispatch(createComplaints(data)).unwrap();
            setContactMassages('Contact created successfully'); // Set success message after successful submission
            setIsOpen(false);
            setContactMassages(null); // Clear success message after 1 second
            reset(); // Clear form after 1 secon
        } catch (err) {
            setContactMassages(null); // Clear success message in case of error
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isComplaintLoading, // Use the loading state from Redux
        error: complaintError,         // Error state from Redux
        reset,
        contactMassages: complaintMassages,
    };
}