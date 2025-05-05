import { useDispatch } from "react-redux";
import { updateComplaintStatus } from "../../../stores/actions/complaintsActions";

export default function useChangeComplaintStatus() {
  const dispatch = useDispatch();

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateComplaintStatus({ id, status: newStatus }));
  };

  return { handleStatusChange };
}
