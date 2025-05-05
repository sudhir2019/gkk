import { useParams } from "react-router-dom";
import useAdminCreditAdjust from "../../../hooks/admin/users/admin/useAdminCreditAdjust";
import { ScaleLoader } from "react-spinners";
import { useDispatch } from "react-redux";


export default function AdminCreditAdjust() {
    const { any } = useParams();
   console.log(any);
 
   
    const {
        register,
        handleSubmit,
        onSubmit,
        isCreditAdjustLoading,
        showCreditAdjustMessage,
        showCreditAdjustError,
        errors,
        authUser,
        admin
    } = useAdminCreditAdjust(any);
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-header">
                        <h6>Admin  Credit Adjust</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group d-flex">
                                <div className="col-sm-4 offset-lg-3">
                                    <h4 className="breadcrumb bg-slate-700 text-white">User: {admin?.username || ""}</h4>
                                    <br />
                                    <h4 className="breadcrumb bg-slate-700 text-white">
                                        Individual Credit: {(admin?.walletBalance || 0).toFixed(2)}
                                    </h4>
                                    <br />
                                    <h4 className="breadcrumb bg-slate-700 text-white">
                                        Hierarchy Credit: {(authUser?.walletBalance || 0).toFixed(2)}
                                    </h4>
                                </div>
                            </div>

                            <div className="form-group d-flex">
                                <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">
                                    Amount to Transfer
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="number"
                                        className="form-control"
                                        {...register("transferAmount", { required: "Amount is required", min: { value: 1, message: "Amount must be greater than 0" } })}
                                        autoComplete="off"
                                    />
                                    {errors.transferAmount && (
                                        <span className="text-danger">{errors.transferAmount.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group d-flex">
                                <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">
                                    Password
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="password"
                                        className="form-control"
                                        {...register("password", { required: "Password is required" })}
                                        autoComplete="off"
                                    />
                                    {errors.password && (
                                        <span className="text-danger">{errors.password.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div className="col-sm-6 offset-lg-3" style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isCreditAdjustLoading}
                                    >
                                        {isCreditAdjustLoading ? "Processing..." : "Credit Transfer"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            {showCreditAdjustMessage && <div className="alert alert-success">{showCreditAdjustMessage}</div>}
                            {showCreditAdjustError && <div className="alert alert-danger">{showCreditAdjustError}</div>}
                        </form>
                    </div>
                </div>
            </div>

            {isCreditAdjustLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )}
        </div>
    );
}
