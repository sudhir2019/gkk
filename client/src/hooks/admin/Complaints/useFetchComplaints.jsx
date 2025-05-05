import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from '../../../stores/actions/complaintsActions';

export default function useFetchComplaints() {
    const dispatch = useDispatch();

    const {
        complaints,
        isComplaintLoading,
        isComplaintError,
        complaintErrorMessage,
    } = useSelector((state) => state.complaint); // Change this to match your actual reducer slice name

    useEffect(() => {
        dispatch(fetchComplaints());
    }, [dispatch]);

    return {
        complaints,
        isComplaintLoading,
        isComplaintError,
        complaintErrorMessage,
    };
}
