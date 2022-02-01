
import React, {useState} from "react";

import {usePin} from "@pgweb/react-utils";

export default function() {

    const [minRating, setMinRating] = useState(0);

    const {useGlue, isReady, log} = usePin();

    useGlue("db-query-build", (params, value)=> {
        return {
            filters: {
                rating: {$gte: Number(minRating)}
            }
        }
    });

    if (!isReady) return;

    return (
        <article>
            <label> With rating at least: </label>
            <select value={minRating} onChange={e=>setMinRating(e.target.value)}>
                <option key={0} value={0}>N/A</option>
                <option key={1} value={1}>1</option>
                <option key={2} value={2}>2</option>
                <option key={3} value={3}>3</option>
                <option key={4} value={4}>4</option>
                <option key={5} value={5}>5</option>
           </select>
        </article>
    )
}
