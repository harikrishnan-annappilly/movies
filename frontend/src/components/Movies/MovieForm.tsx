import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(3),
    price: z.number({ invalid_type_error: "Invalid number" }).min(1),
    categoryID: z.number({ invalid_type_error: "Invalid selection" }).min(1),
});

type MovieFormData = z.infer<typeof schema>;

function MovieForm() {
    const { movieID } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MovieFormData>({
        resolver: zodResolver(schema),
        criteriaMode: "all",
        mode: "onChange",
    });

    const handleOnSubmit = (formData: MovieFormData) => console.log(formData);

    return (
        <div className="row mb-3">
            <div className="col"></div>
            <div className="col-6">
                <form
                    autoComplete="off"
                    className="shadow p-3 rounded border"
                    onSubmit={handleSubmit(handleOnSubmit)}
                >
                    <div className="mb-3">
                        <h4
                            className={
                                Object.keys(errors).length !== 0
                                    ? "text-danger"
                                    : ""
                            }
                        >
                            {movieID} - Movie Form
                        </h4>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Movie Name:</label>
                        <input
                            type="text"
                            {...register("name")}
                            className={
                                "form-control " +
                                (errors["name"] && "border-danger")
                            }
                        />
                        {errors["name"]?.types &&
                            Object.values(errors["name"].types).map(
                                (errorMessage) => (
                                    <p className="text-danger mb-1">
                                        {errorMessage}
                                    </p>
                                )
                            )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Movie Price:</label>
                        <input
                            type="number"
                            {...register("price", { valueAsNumber: true })}
                            className={
                                "form-control " +
                                (errors["price"] && "border-danger")
                            }
                        />
                        {errors["price"]?.types &&
                            Object.values(errors["price"].types).map(
                                (errorMessage) => (
                                    <p className="text-danger mb-1">
                                        {errorMessage}
                                    </p>
                                )
                            )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category:</label>
                        <select
                            {...register("categoryID", { valueAsNumber: true })}
                            className={
                                "form-select " +
                                (errors["categoryID"] && "border-danger")
                            }
                        >
                            <option value="">--Select--</option>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                        </select>
                        {errors["categoryID"]?.types &&
                            Object.values(errors["categoryID"].types).map(
                                (errorMessage) => (
                                    <p className="text-danger mb-1">
                                        {errorMessage}
                                    </p>
                                )
                            )}
                    </div>
                    <div className="mb-3">
                        <button
                            className={
                                "btn btn-" +
                                (Object.keys(errors).length !== 0
                                    ? "danger"
                                    : "primary")
                            }
                            disabled={Object.keys(errors).length !== 0}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <div className="col"></div>
        </div>
    );
}

export default MovieForm;
