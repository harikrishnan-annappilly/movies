import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import http from "../services/api-service";

export default function <T>(endpoint: string) {
    const [genricList, setGenricList] = useState<T[]>([]);

    useEffect(() => {
        const constoller = new AbortController();

        http.get(endpoint, {
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
