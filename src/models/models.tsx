export interface IAirports {
    id: number,
    name: string,
    code: string,
    state: string,
    city: string
}

export interface IAirline {
    id: number,
    name: string,
    icao_code: string
}

export interface ISearch {
    arrAirport: IAirports,
    depAirport: IAirports,
    airline: IAirline,
    time: string,
    date: string

}

export interface IFlight {
    aircraft_icao: string,
    airline_iata: string,
    airline_icao: string,
    arr_baggage: string,
    arr_estimated: string,
    arr_estimated_ts: number,
    arr_estimated_utc: string,
    arr_gate: string,
    arr_iata: string,
    arr_icao: string,
    arr_terminal: string | null,
    arr_time: string,
    arr_time_ts: number,
    arr_time_utc: string,
    cs_airline_iata: string | null,
    cs_flight_iata: string | null,
    cs_flight_number: string | null,
    delayed: number,
    dep_gate: string,
    dep_iata: string,
    dep_icao: string,
    dep_terminal: string | null,
    dep_time: string,
    dep_time_ts: number,
    dep_time_utc: string,
    duration: number,
    flight_iata: string,
    flight_icao: string,
    flight_number: string,
    status: string
}
// export default IAirports;
