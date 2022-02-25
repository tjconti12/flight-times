import { IFlight } from '../../models/models';

type FlightDisplayProps = {
    foundFlights: IFlight[];
    searched: boolean;
}

const FlightDisplay = ({ foundFlights, searched } : FlightDisplayProps) => {

  if (searched && foundFlights.length === 0) return <h3>No Flights Found</h3>

  return (
    <div>
      {(searched && foundFlights.length > 0) && foundFlights.map((flight: IFlight) => {
        return (
          <div key={flight.flight_number}>
            <h3>
              Flight Number: {flight.flight_number}
            </h3>
            <h3>
              Scheduled Arrival: {flight.arr_time}
            </h3>
            <h3>
              Estimated Arrival:
              { flight.arr_estimated ? ` ${flight.arr_estimated}` : " Sorry we don't have an estimated arrival at this time."}
            </h3>
            <h3>
              Delayed:
              { flight.delayed ? ` ${flight.delayed}` : " Sorry we don't have a delay status at this time"}
            </h3>
          </div>
          )
        })
      }
    </div>
  )
}

export default FlightDisplay