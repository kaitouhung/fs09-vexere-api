const nodemailer = require("nodemailer");
const fs = require("fs"); // node built-in Nodejs
const hogan = require("hogan.js");
const template = fs.readFileSync("services/email/bookingTicketEmailTemplate.hjs", "utf-8");

const compiledTemplate = hogan.compile(template);

module.exports.sendBookTicketEmail = (user, trip, ticket) => {
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        requireSSL: true,
        auth: {
            user: "mrhunguit@gmail.com",
            pass: "hunghung21"
        }
    }

    const transporter = nodemailer.createTransport(transport);

    const mailOptions = {
        from: "mrhunguit@gmail.com",
        to: "16520478@gm.uit.edu.vn",
        subject: "Mail xac nhan dang ky mua ve thanh cong",
        html: compiledTemplate.render({
            email: user.email,
            fromStation: trip.fromStationId.name,
            toStation: trip.toStationId.name,
            price: trip.price,
            amout: ticket.seats.length,
            total: trip.price * ticket.seats.length,
            seatCodes: ticket.seats
                .map(m=>m.code)
                .join(", ")
        })
    }

    transporter.sendMail(mailOptions, err => {
        if (err) return console.log(err)
        console.log("Send email successfully")
    })
}


