
import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        // To stop loading when routed to another page use abort controller
        const abortCont = new AbortController();

            fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for the resource')
                }
                return res.json();
            }).then(data => {
                // console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            }).catch(err => {
                if (err.name === 'Abort') {
                    // console.log('Aborted');
                } else {
                    setIsPending(false);
                    setError(err.message)
                }
            });
        
        return () => abortCont.abort();
    }, [url,]);
    return { data, isPending, error }
}

export default useFetch;