const { Station } = require("../../../../models/Station");

const getStations = (req, res, next) => {
    Station.find()
        .then(stations => {
            res.status(200).json(stations)
        })
        .catch(err => res.json(err))

}

const getStationById = (req, res, next) => {
    const { id } = req.params
    Station.findById(id)
        .then(station => {
            res.status(200).json(station)
        })
        .catch(err => res.json(err))
}

const postStation = (req, res, next) => {
    // const name=req.body.name;
    // const address =req.body.address;
    // const province =req.body.province;
    const { name, address, province } = req.body;

    const newStation = new Station({ name, address, province })
    newStation.save()
        .then(station => {
            res.status(201).json(station)
        })
        .catch(err => res.json(err))
}

const putStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })

            const keys = ["name", "address", "province"]
            keys.forEach(key => {
                station[key] = req.body[key]
            })

            // const {name,address,province}=req.body;
            // station.name=name;
            // station.address=address;
            // station.province=province;

            // station._doc={
            //     ...station._doc,
            //     ...req.body
            //     // ..._.pick(req.body,["name","address","province"])
            // }
            // Object.keys(station).forEach(key=>station_instance[key]=station[key]))
            return station.save()
        })
        .then(station => res.status(200).json(station))
        .catch(err => res.json(err))

}

const patchStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })

            // const { name, province, address } = req.body;
            // station.name = name ? name : station.name;
            // if (name) station.name = name            
            // if (address) station.address = address
            // if (province) station.province = province
            Object.keys(req.body).forEach(key => {
                station[key] = req.body[key]
            })

            return station.save()
        })
        .then(station => res.status(200).json(station))

        .catch(err => res.json(err))

}

const deleteStationById = (req,res,next)=>{
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })

            return Promise.all([
                Station.deleteOne({_id:id}),
                station
            ])          
            
            
        })
        .then(result => res.status(200).json(result[1]))

        .catch(err => res.json(err))

}



module.exports = {
    getStations,
    postStation,
    getStationById,
    putStationById,
    patchStationById,
    deleteStationById
}