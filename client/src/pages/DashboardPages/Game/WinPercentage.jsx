import { ScaleLoader } from "react-spinners"
import useUpdateWinpercentage from '../../../hooks/admin/percentage/useUpdateWinpercentage'

function WinPercentage() {
  const {
    register,
    handleSubmit,
    isSubmitting,
    winPercemtageloading,
    percentagelist,
    percentageLoading,
    changedValues,
    handleInputChange,
    percentageSuccess,
    percentageError,
    getValues,
    updateChangedPercentages,
  } = useUpdateWinpercentage();

  return (
    <form onSubmit={handleSubmit(updateChangedPercentages)}> {/* 🔥 Bulk update changed values only */}
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h2 className='text-xl font-bold'>Percentages</h2>
            </div>
            <div className="card-body">
              <div className="col-md-12 d-flex mb-4">
                <div className='table-responsive'>
                  <table className='table table-sm'>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>ID</th>
                        <th>Game</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {percentagelist && percentagelist.length > 0 ? (
                        percentagelist.map((obj, i) => (
                          <tr key={`${obj.gameId}-${i}`}>
                            <td>{i + 1}</td>
                            <td style={{ color: "darkcyan" }}>{obj.username}</td>
                            <td style={{ color: "slateblue" }}>{obj.gameName}</td>
                            <td>
                              <input
                                type="number"
                                {...register(`winPercentages.${obj.id}`, { min: 1 })} // Hooked to `useForm`
                                className="form-control"
                                autoComplete="off"
                                autoFocus={i === 0}
                                onChange={(e) => handleInputChange(obj.id, e.target.value)} // Track changes
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="5">No games available</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {percentageError && (
                <div className="alert alert-danger">
                  {percentageError.message || percentageError}
                </div>
              )}
              {percentageSuccess && (
                <div className="alert alert-success">
                  {percentageSuccess.message || percentageSuccess}
                </div>
              )}
              {/* Submit Button for Bulk Update */}
              <div className="w-full flex justify-end mt-4 pr-4">
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-2 text-white rounded-lg shadow-md"
                  disabled={isSubmitting || Object.keys(changedValues).length === 0}
                >
                  {isSubmitting ? "Updating..." : "Set Percentage"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {(winPercemtageloading || percentageLoading) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ScaleLoader />
        </div>
      )}
    </form>
  )
}

export default WinPercentage;
