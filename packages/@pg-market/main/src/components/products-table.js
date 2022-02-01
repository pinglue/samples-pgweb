import React, {useState} from "react";

import {usePin} from "@pgweb/react-utils";

export default function ProductsTable() {

    const [products, setProducts] = useState([]);
    const {runA, isReady} = usePin();

    const onSearch = async () => {
        if (!isReady) return;

        // in-resident controller is ready

        const res = await runA("db-query", {
            collection: "products",
            query: {
                limit: 20
            }
        });

        if (res.type === "success")
            setProducts(res.data.result);        
    }

    if (!isReady) return;

    return (
        
        <article>

            <section>
                <button onClick={onSearch}>
                    Search
                </button>
            </section>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p=>(
                        <tr key={p._id}>
                            <td>{p.title} (Rating: {p.rating})</td>
                            <td>{p.type}</td>
                            <td>{p.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </article>
    );

}
