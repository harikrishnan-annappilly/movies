import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function MovieForm() {
    const { movieID } = useParams();
    const { register, handleSubmit } = useForm();

    return (
        <div className="row">
            <div className="col"></div>
            <div className="col-6">
                <form
                    autoComplete="off"
                    onSubmit={handleSubmit((formData) => console.log(formData))}
                >
                    <div className="mb-3">
                        <h4>{movieID} - Movie Form</h4>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Movie Name:</label>
                        <input
                            type="text"
                            {...register("username")}
                            className="form-control"
                        />
                        <p className="text-danger">Error Message</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Movie Price:</label>
                        <input
                            type="number"
                            {...register("price", { valueAsNumber: true })}
                            className="form-control"
                        />
                        <p className="text-danger">Error Message</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category:</label>
                        <select
                            {...register("category")}
                            className="form-select"
                        >
                            <option value="">---</option>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                        </select>
                        <p className="text-danger">Error message</p>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
            <div className="col"></div>
        </div>
    );
}

export default MovieForm;
