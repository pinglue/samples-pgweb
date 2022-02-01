import "../pg/hub-factory";
import * as React from "react";

import ProductsTable from "../components/products-table";
import RatingFilter from "../components/rating-filter";
import TitleSort from "../components/list-sort";

export default function() {

    return (
        <>
            <h1> List of products</h1> 
            <section>
                <RatingFilter/>
                <TitleSort/>
            </section>

            <section>
                <ProductsTable/>            
            </section>

        </>
    );
}