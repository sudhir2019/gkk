import { useState } from "react";
import complaintMassages from "../../hooks/admin/Complaints/useCreateComplaint";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, X, Send, Loader2 } from "lucide-react";

function FloatingComplaintForm() {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, onSubmit, errors, isLoading } = complaintMassages(setIsOpen);

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 sm:p-4 shadow-xl z-[1000] focus:outline-none focus:ring-4 focus:ring-blue-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageSquarePlus className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (

                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-[1001] p-4 sm:p-6 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden my-8 sm:my-0"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="p-4 sm:p-6 md:p-8">
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                                </motion.button>

                                <div className="text-center mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Submit a Complaint</h2>
                                    <p className="text-sm sm:text-base text-gray-600 mt-1">We’re here to help you.</p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">


                                    <div>
                                        <label className="form-labe">Full Name</label>
                                        <input
                                            {...register("fullName", { required: "Full name is required" })}
                                            className="input-field"
                                            placeholder="John Doe"
                                        />
                                        {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
                                    </div>

                                    <div>
                                        <label className="form-label">Email</label>
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Please enter a valid email"
                                                }
                                            })}
                                            className="input-field"
                                            placeholder="john@example.com"
                                            type="email"
                                        />
                                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <label className="form-label">Mobile</label>
                                        <input
                                            {...register("mobile", {
                                                required: "Mobile number is required",
                                                pattern: {
                                                    value: /^\d{10}$/,
                                                    message: "Enter a valid 10-digit mobile number"
                                                }
                                            })}
                                            className="input-field"
                                            placeholder="9876543210"
                                            type="tel"
                                        />
                                        {errors.mobile && <p className="error-message">{errors.mobile.message}</p>}
                                    </div>
                                    <div>
                                        <label className="form-label">Enquiry Type</label>
                                        <input
                                            {...register("enquiryType", { required: "Enquiry type is required" })}
                                            className="input-field"
                                            placeholder="General, Technical, Feedback..."
                                        />
                                        {errors.enquiryType && <p className="error-message">{errors.enquiryType.message}</p>}
                                    </div>
                                    <div>
                                        <label className="form-label">Complaint Details</label>
                                        <textarea
                                            {...register("complaintDetails", { required: "Complaint details are required" })}
                                            rows={3}
                                            className="input-field"
                                            placeholder="Please describe your issue clearly..."
                                        />
                                        {errors.complaintDetails && <p className="error-message">{errors.complaintDetails.message}</p>}
                                    </div>
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-900 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                                        )}
                                        <span>{isLoading ? "Sending..." : "Submit Complaint"}</span>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default FloatingComplaintForm;
