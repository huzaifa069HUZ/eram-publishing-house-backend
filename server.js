// 1. Import necessary packages
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// 2. Set up the Express app
const app = express();
const port = process.env.PORT || 3000; // The port our server will run on

// 3. Use middleware to handle data
app.use(cors()); // Allows our frontend to communicate with this server
app.use(express.json()); // Allows the server to understand JSON data
app.use(express.urlencoded({ extended: true })); // Allows the server to understand form data

// 4. Create the main route for handling form submissions
app.post('/send-email', (req, res) => {
    // Get the data from the form submission
    const { name, email, phone, message } = req.body;

    // 5. Set up Nodemailer to send the email
    // IMPORTANT: You need to use an "App Password" for Gmail, not your regular password.
    // See Google's guide: https://support.google.com/accounts/answer/185833
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'erampublishinghouse2000@gmail.com',
            pass: 'dcab ljcj hyik sfxu' // Replace with your App Password
        }
    });

    // 6. Define the email's content
    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender's name and email
        to: 'erampublishinghouse2000@gmail.com', // Where you want to receive the email
        subject: 'New Manuscript Inquiry from Website',
        html: `
            <h3>New Inquiry from ERAM Publishing Website</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    // 7. Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully!');
        }
    });
});

// 8. Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
