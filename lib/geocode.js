const MAPBOX_API_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export const geoCode = async (address) => {
    const mapToken = "pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ";
    const response = await fetch(`${MAPBOX_API_ENDPOINT}/${address}.json?access_token=${mapToken}`);
    const res = await response.json();
    let finalRes = res.features[0].geometry;
    return finalRes;
}

