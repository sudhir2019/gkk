import { useParams } from "react-router-dom";
import useUsersCreditTransfer from "../../../hooks/admin/users/otc/useOtcCreditTransfer"; // Adjust path as necessary
import { ScaleLoader } from "react-spinners"
export default function OtcCreditTransfers() {
    const { any } = useParams();
    const {
        register,
        handleSubmit,
        onSubmit,
        otc,
        showCreditMessage,
        isCreditLoading,
        showCreditError,
        errors,
        senderAmount
    } = useUsersCreditTransfer(any);


    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-header">
                        <h6>OTC Credit Transfer</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group d-flex">
                                <div className="col-sm-4 offset-lg-3">
                                    <h4 className="breadcrumb bg-slate-700 text-white">User: {otc?.username || ""}</h4>
                                    <br />
                                    <h4 className="breadcrumb  bg-slate-700 text-white">
                                        Individual Credit: {(otc?.walletBalance || 0).toFixed(2)}
                                    </h4>
                                    <br />
                                    <h4 className="breadcrumb  bg-slate-700 text-white">
                                        Hierarchy Credit: {(senderAmount?.walletBalance || 0).toFixed(2)}
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
                                        name="transferAmount"
                                        {...register("transferAmount", { required: "Amount is required" })}
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
                                        name="password"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && (
                                        <span className="text-danger">{errors.password.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <label className="col-sm-2 offset-lg-1 text-right control-label mt-2"></label>
                                <div className="col-sm-6" style={{ display: "flex", gap: "10px" }}>
                                    <button type="submit" className="btn btn-primary" disabled={isCreditLoading}>
                                        {isCreditLoading ? "Processing..." : "Credit Transfer"}
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
                        </form>
                        {showCreditMessage && <div className="alert alert-success">{showCreditMessage}</div>}
                        {showCreditError && <div className="alert alert-danger">{showCreditError}</div>}
                    </div>
                </div>
            </div>
            {isCreditLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )
            }
        </div>
    );
}
