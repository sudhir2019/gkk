import { useParams } from "react-router-dom";
import useUpdateRetailerChildren from "../../../hooks/admin/chileduser/retailers/useUpdateRetailerChildren";
import { ScaleLoader } from "react-spinners";

export default function EditRetailerChildren() {
    const { any, id } = useParams(); // FIX: Use correct param name
    const {
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
    } = useUpdateRetailerChildren({ any, id });
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Edit Player</h6>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                {/* Username */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>User Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("username")}
                                            defaultValue={watch("username") || ""}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("password")}
                                            onChange={(e) => setValue("password", e.target.value)} // ✅ Ensures state updates
                                        />
                                    </div>
                                </div>

                                {/* Commission */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Commission:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            {...register("commission", { required: true })}
                                            defaultValue={watch("commission") ?? 0}
                                        />
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Note:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("note", { required: true })}
                                            defaultValue={watch("note") ?? ""}
                                        />
                                    </div>
                                </div>

                                {/* Reference */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Reference:</label>
                                        <select
                                            className="form-control"
                                            {...register("refId", { required: "Reference is required" })}
                                            defaultValue={watch("refId") ?? ""}
                                            disabled={isUpdateLoading}
                                        >
                                            <option value="">--Select Reference--</option>
                                            {retailers?.map((ref, index) => (
                                                <option key={index} value={ref._id}>
                                                    {ref.username}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-sm-6 pt-9">
                                    <div className="form-group">
                                        <div className="flex text-center items-center gap-[30px]">
                                            <label>Status:</label>
                                            <div className="flex g-1">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...register("userStatus", { required: "Status is required" })}
                                                    value="true"
                                                    checked={watch("userStatus") === "true"} // ✅ Use checked instead of defaultChecked
                                                    disabled={isUpdateLoading}
                                                />
                                                <label className="form-check-label">Active</label>
                                            </div>
                                            <div className="flex g-1">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...register("userStatus")}
                                                    value="false"
                                                    checked={watch("userStatus") === "false"} // ✅ Use checked instead of defaultChecked
                                                    disabled={isUpdateLoading}
                                                />
                                                <label className="form-check-label">Deactive</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        {isUpdateLoading ? "Updating..." : "Submit"}
                                    </button>
                                    <button type="button" onClick={() => window.history.back()} className="btn btn-light">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="p-1">
                        {showUpdateMessage && <p className="text-success">{showUpdateMessage}</p>}
                        {showUpdateError && <p className="text-danger">{showUpdateError}</p>}
                    </div>
                </div>
            </div>

            {/* Loading Indicator */}
            {isUpdateLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )}
        </div>
    );
}
