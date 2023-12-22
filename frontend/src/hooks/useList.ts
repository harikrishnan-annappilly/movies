import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";

export default function <T>(endpoint: string) {
    const [genricList, setGenricList] = useState<T[]>([]);

    useEffect(() => {
        const constoller = new AbortController();

        axios
            .get("http://localhost:5000/" + endpoint, {
                signal: constoller.signal,
            })
            .then(({ data }) => setGenricList(data))
            .catch((err) =>
                err instanceof CanceledError ? null : console.log(err)
            );

        return () => constoller.abort();
    }, []);

    return { genricList, setGenricList };
}
