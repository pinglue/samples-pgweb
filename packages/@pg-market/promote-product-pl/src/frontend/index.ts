
import {Controller} from "pinglue/browser";

export default class extends Controller {

    async init() {      

        // Glue some handler:
        this.glue(
            "db-response-process", 
            this.dbResponseHandler.bind(this)
        );

    }
    
    async dbResponseHandler(params, value) {
        
        // if the query is not for product collection then do nothing
        if (params.collection !== "products") 
            return;

        // if the query result does not have the right format just quit
        if (!Array.isArray(value.result))
            return;

        // else, modify the result:

        const promotionInfo = await this.getPromotions();

        // an array of promoted 
        const promotedProductsTitles = promotionInfo
            .map(item => item.title);

        const promotedItems = [];
        const regularItems = [];

        for (const item of value.result) {
            if (promotedProductsTitles.includes(item.title))
                promotedItems.push(item)
            else
                regularItems.push(item);
        }

        // the return object will be merged with the original value (=query response)

        return {
            result: [...promotedItems, ...regularItems]
        };

    }

    /**
     * 
     * @returns a list of promotions (from the backend db)
     */
    private async getPromotions() {
        
        // TODO: this will have to the the list of the deals from the backend. For now we hardcode it:

        const promotionInfo = [

            {
                title: "Brown eggs",
                percentageOff: 60
            },            
            {
                title: "Caprese salad",
                percentageOff: 45
            },

        ];

        return promotionInfo;
    }
   
}
