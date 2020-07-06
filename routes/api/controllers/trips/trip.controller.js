const { Trip } = require("../../../../models/Trip");
const { Seat } = require("../../../../models/Seat");
const _ = require("lodash");


const codeArr = ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12",
    "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12"]


const getTrips = (req, res, next) => {

    // hiển thị thêm availableSeatNumber
    //(số lượng ghế trống)

    Trip.find()
        // .select("-seats")
        .then(trips => {
            const _trips = trips.map(trip => {
                // const modifiedTrip= {
                //     ...trip._doc,
                //     availableSeatNumber: trip.seats.filter(seat => !seat.isBooked).length
                // }
                // delete modifiedTrip.seats;
                // return modifiedTrip;

                // return {
                //     ..._.omit(trip._doc,["seats"]),
                //     availableSeatNumber: trip.seats.filter(seat => !seat.isBooked).length
                // }

                // return _.assign(
                //     _.omit(trip._doc,["seats"]),
                //     {availableSeatNumber: trip.seats.filter(seat => !seat.isBooked).length}
                // )

                return _.chain(trip)
                    .get("_doc")
                    .omit(["seats"])
                    .assign({ availableSeatNumber: trip.seats.filter(seat => !seat.isBooked).length }).value()

            })

            res.status(200).json(_trips)
        })
        .catch(err => res.json(err))
}

const postTrip = (req, res, next) => {
    const { fromStationId, toStationId, startTime, price } = req.body;
    const seats = codeArr.map(code => {
        return new Seat({ code })
    })
    const newTrip = new Trip({ fromStationId, toStationId, startTime, price, seats })

    newTrip.save()
        .then(trip => res.status(201).json(trip))
        .catch(err => res.json(err))

}

const getTripById = (req, res, next) => {
    const { id } = req.params
    Trip.findById(id)
        .then(trip => {
            
            if (!trip) return Promise.reject({
                status: 404,
                message: "Trip not found"
            })

            res.status(200).json(trip)
        })
        .catch(err => res.json(err))
}

const patchTripById = (req, res, next) => {

    const { id } = req.params;
    Trip.findById(id)
        .then(trip => {
            if (!trip) return Promise.reject({
                status: 404,
                message: "Trip not found"
            })
            
            Object.keys(req.body).forEach(key => {
                trip[key] = req.body[key]
            })

            return trip.save()
        })
        .then(trip => res.status(200).json(trip))

        .catch(err => res.json(err))

}

const deleteTripById=(req,res,next) =>{

    const { id } = req.params;
    Trip.findById(id)
        .then(trip => {
            if (!trip) return Promise.reject({
                status: 404,
                message: "Trip not found"
            })

            return Promise.all([
                Trip.deleteOne({_id:id}),
                trip
            ])          
            
            
        })
        .then(result => res.status(200).json(result[1]))

        .catch(err => res.json(err))

}
module.exports = {
    getTrips,
    postTrip,
    getTripById,
    patchTripById,
    deleteTripById

}