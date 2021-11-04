import axios from "axios";

export const reverseGeocoding = async(posX,posY) =>{
    const resp = await axios.get("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc", {
        headers:{
            "X-NCP-APIGW-API-KEY-ID":"9m1bp5yno2",
            "X-NCP-APIGW-API-KEY":"TTRfNZJVpHU0ilnuPhUreZFOdnLLs70Lh4yPqm6V"
        },
        params:{
            coords:`${posX},${posY}`,
            sourcecrs:"epsg:4326",
            output:"json",
            request:"coordsToaddr",
            orders:"addr,roadaddr"
        }
    });
    return resp.data.results
}

