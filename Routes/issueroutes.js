const express = require('express');
const router = express.Router();
const AssetIssue = require('../model/issuemodel.js');

const nodemailer = require('nodemailer');

const sendAssetIssueNotification = async (issueDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ramdevcse25@gmail.com',
                pass: 'tqvtdfsauntlxqju',
            },
        });
       const mailOptions = {
            from: 'ramdevcse25@gmail.com',
            to: 'mohanapriyanarayanan1@gmail.com',
            subject: 'Asset Issue Notification',
            text: `Asset issue notification:\n\n${JSON.stringify(issueDetails, null, 2)}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
    }};

router.post("/report-issue", async (req, res) => {
    try {
        const issueDetails = {
            AssetId: req.body.AssetId,
            issueDescription: req.body.issueDescription,
            reportedBy: req.body.reportedBy,
            dateReported: req.body.dateReported,
        };
        const assetIssue = new AssetIssue(issueDetails);
        await assetIssue.save();
        await sendAssetIssueNotification(issueDetails);
                res.status(201).json({
            message: 'Asset issue reported successfully',
            data: assetIssue,
        });
    } catch (err) {
        res.status(400).json({
            message: 'Error reporting asset issue',
            error: err.message,
        });
    }
});


module.exports = router;
