import useCreateDistributoesChildren from "../../../hooks/admin/chileduser/distributors/useCreateDistributoesChildren";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function AddDistributoesChildren({ adminParent }) {
    const {
        register,
        handleSubmit,
        onSubmit,
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
        cities
    } = useCreateDistributoesChildren(adminParent);
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Add Master</h6>
                        <form className="forms-sample" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <div className="row">
                                {/* First Name */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input type="text" className="form-control"
                                            {...register("firstName", { required: "First Name is required" })}
                                            autoComplete="off" />
                                        {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input type="text" className="form-control"
                                            {...register("lastName", { required: "Last Name is required" })}
                                            autoComplete="off" />
                                        {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" className="form-control"
                                            {...register("email", { required: "Email is required" })}
                                            autoComplete="off" />
                                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input type="number" className="form-control"
                                            {...register("phone", { required: "Phone number is required" })} />
                                        {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                {/* <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Date of Birth:</label>
                                        <input type="date" className="form-control"
                                            {...register("dateOfBirth", { required: "Date of Birth is required" })} />
                                        {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth.message}</p>}
                                    </div>
                                </div> */}
                                {/* Commission */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Commission:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            {...register("commission", { required: true })}
                                        />
                                        {errors.commission && <p className="text-danger">{errors.commission.message}</p>}
                                    </div>
                                </div>
                                {/* Occupation */}
                                {/* <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Occupation:</label>
                                        <input type="text" className="form-control"
                                            {...register("occupation")} />
                                    </div>
                                </div> */}
                                {/* Country */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Country:</label>
                                        <select className="form-control"
                                            {...register("country", { required: "Country is required" })}
                                            onChange={(e) => handleCountryChange(e.target.value)}
                                            value={selectedCountry}>
                                            <option value="">--Select Country--</option>
                                            {countries.map((country) => (
                                                <option key={country.isoCode} value={country.isoCode}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.country && <p className="text-danger">{errors.country.message}</p>}
                                    </div>
                                </div>

                                {/* State */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>State:</label>
                                        <select className="form-control"
                                            {...register("state", { required: "State is required" })}
                                            onChange={(e) => handleStateChange(e.target.value)}
                                            value={selectedState}>
                                            <option value="">--Select State--</option>
                                            {states.map((state) => (
                                                <option key={state.isoCode} value={state.isoCode}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.state && <p className="text-danger">{errors.state.message}</p>}
                                    </div>
                                </div>

                                {/* City */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>City:</label>
                                        <select
                                            className="form-control"
                                            {...register("city", { required: "City is required" })}
                                            onChange={(e) => handleCityChange(e.target.value)}
                                            value={selectedCity}
                                        >
                                            <option value="">--Select City--</option>
                                            {cities.map((city) => (
                                                <option key={city.name} value={city.name}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.city && <p className="text-danger">{errors.city.message}</p>}
                                    </div>
                                </div>
                                {/* Role (Hidden) */}
                                <input type="hidden" {...register("role")} value="master" />

                                {/* Address */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Address:</label>
                                        <input type="text" className="form-control"
                                            {...register("address", { required: "Address is required" })} />
                                        {errors.address && <p className="text-danger">{errors.address.message}</p>}
                                    </div>
                                </div>

                                {/* PIN Code */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>PIN Code:</label>
                                        <input type="number" className="form-control"
                                            {...register("pinCode", { required: "PIN Code is required" })} />
                                        {errors.pinCode && <p className="text-danger">{errors.pinCode.message}</p>}
                                    </div>
                                </div>
                                {/* Password */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Password :</label>
                                        <input type="text" className="form-control"
                                            {...register("password", { required: "PIN is required" })} />
                                        {errors.pin && <p className="text-danger">{errors.pin.message}</p>}
                                    </div>
                                </div>
                                {/* PIN */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>PIN:</label>
                                        <input type="number" className="form-control"
                                            {...register("pin", { required: "PIN is required" })} />
                                        {errors.pin && <p className="text-danger">{errors.pin.message}</p>}
                                    </div>
                                </div>
                                {/* Reference */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Reference:</label>
                                        <select className="form-control" {...register("refId", { required: true })}>
                                            <option value="">--Select Ref--</option>
                                            <option key={adminParent?._id} value={adminParent?._id}>{adminParent?.username}</option>
                                            <option value="" disabled>No superSuperDistributorss available</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-sm-6 pt-3">
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <div className="d-flex gap-3">
                                            <label>
                                                <input type="radio" {...register("userStatus")} value={true} defaultChecked />
                                                Active
                                            </label>
                                            <label>
                                                <input type="radio" {...register("userStatus")} value={false} />
                                                Deactive
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit & Cancel Buttons */}
                                <div className="col-sm-6 pt-3">
                                    <button type="submit" className="btn btn-primary mr-2" disabled={isCreateLoading}>
                                        {isCreateLoading ? "Submitting..." : "Submit"}
                                    </button>
                                    <button type="button" onClick={() => navigate(-1)} className="btn btn-light">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Success/Error Messages */}
                    <div className="p-1">
                        {showCreateMessage && <p className="text-success">{showCreateMessage}</p>}
                        {showCreateError && <p className="text-danger">{showCreateError}</p>}
                    </div>
                </div>
            </div>
            {/* Loading Indicator */}
            {isCreateLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )}
        </div>
    );
}
