export interface Predictions{
    predictions: Array<{
        description:string;
        place_id:string;
        reference:string
        
    }>;
}


export interface CurrentPlaceSearchCoordinate{
    result:{
        geometry:{
            location:{
                lat: number;
                lng: number;
            }
        };
        place_id:string;
        vicinity:string;
    }
}



