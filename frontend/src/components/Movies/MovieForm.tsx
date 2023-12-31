import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MoviesData } from "../../hooks/userMovie";
import useCategory from "../../hooks/useCategory";
import {
    saveMovie,
    movieSchema,
    MovieFormData,
} from "../../services/movie-service";

function MovieForm() {
    const { movieID } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        criteriaMode: "all",
        mode: "onChange",
    });
    const [populateError, setPopulateError] = useState<React.ReactNode>();
    const { categoryList } = useCategory();
    const host = `${window.location.protocol}//${window.location.hostname}:5000`;
    const get_url = host + `/movie/${movieID}`;

    useEffect(() => {
        if (movieID === "new") return;

        axios
            .get(get_url)
            .then(({ data }: { data: MoviesData }) => {
                const formData = {
                    movieID: movieID,
                    name: data.name,
                    categoryID: data.category.id,
                };
                reset(formData);
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 404) {
                        setPopulateError(
                            <>
                                Movie with ID:<strong>{movieID}</strong> is not
                                present in DB
                            </>
                        );
                    }
                }
            });
    }, []);

    const handleOnSubmit = (formData: MovieFormData) => {
        saveMovie(formData)
            .then((res) => {
                console.log(res);
                setPopulateError("");
            })
            .catch((err) => {
                if (err.response.status === 400)
                    setPopulateError(
                        <>
                            Movie name:<strong>{formData.name}</strong> already
                            taken
                        </>
                    );
                else console.log("unexpected error");
            });
        console.log(formData);
    };

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
                            Movie Form
                        </h4>
                    </div>
                    {populateError && (
                        <div className="mb-3">
                            <div
                                className="alert alert-danger alert-dismissible fade show"
                                role="alert"
                            >
                                {populateError}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                            </div>
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Movie ID:</label>
                        <input
                            type="text"
                            {...register("movieID")}
                            className={
                                "form-control " +
                                (errors["movieID"] && "border-danger")
                            }
                        />
                        {errors["movieID"]?.types &&
                            Object.values(errors["movieID"].types).map(
                                (errorMessage) => (
                                    <p
                                        key={errorMessage?.toString()}
                                        className="text-danger mb-1"
                                    >
                                        {errorMessage}
                                    </p>
                                )
                            )}
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
                                    <p
                                        key={errorMessage?.toString()}
                                        className="text-danger mb-1"
                                    >
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
                                    <p
                                        key={errorMessage?.toString()}
                                        className="text-danger mb-1"
                                    >
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
                            {categoryList.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors["categoryID"]?.types &&
                            Object.values(errors["categoryID"].types).map(
                                (errorMessage) => (
                                    <p
                                        key={errorMessage?.toString()}
                                        className="text-danger mb-1"
                                    >
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
