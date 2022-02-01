
import React, {useState} from "react";

import {usePin} from "@pgweb/react-utils";

export default function() {

    // 1 means ascending, -1 means descending
    const [sortDirection, setSortDirection] = useState(1);

    const {useGlue, isReady, log} = usePin();

    useGlue("db-query-build", (params, value)=> {
        return {
            sort: {
                title: sortDirection
            }
        }
    });

    if (!isReady) return;

    return (
        <article>
            <label> Sort by titles: </label>
            <select value={sortDirection} onChange={e=>setSortDirection(Number(e.target.value))}>
                <option key={0} value={1}>Ascending</option>
                <option key={1} value={-1}>Descending</option>
           </select>
        </article>
    )
    
}
