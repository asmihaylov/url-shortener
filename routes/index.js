const mongoose = require("mongoose");
const request = require('request');
const urlModel = mongoose.model("urlModel");
const constants = require("../config/constants");
const shortCode = require("../middlewares/shortURL");
module.exports = app => {

    app.get("/api/url/:code", function (req, res) {
        const urlCode = req.params.code;
        urlModel.findOne({ urlCode: urlCode }, function(error, response){
            if (response) {
                return res.redirect(response.originalUrl);
            } else {
                return res.redirect(constants.homepage);
            }
        });
    });
    app.get("/:code", function (req, res) {
        return res.redirect('/api/url/'+req.params.code);
    });
    app.post("/api/url", function(req, res) {

        // можно было бы использовать иной вариант генерации, кодируя индекс через base58
        var urlCode = shortCode.generate();
        const originalUrl = req.body.url;
        try {
            request(originalUrl)
                .on('response', function(response) {
                    if (response.statusCode === 200) {
                        if (req.body.custom) {
                            urlCode = req.body.custom;
                            urlModel.find({urlCode: urlCode}, function(a,b){
                                if (b.length) {
                                    res.status(409).send('This custom URL already exists. Try another or get random URL');
                                } else {
                                    save();
                                }
                            });
                        } else {
                            save();
                        }
                    } else {
                        res.status(409).send('Invalid URI');
                    }

                })
                .on('error', function(err) {
                    res.status(409).send('Invalid URI');
                });
        } catch(err) {
            res.status(409).send('Invalid URI');
        }

        function save(){
            shortUrl = constants.homepage + "/" + urlCode;
            const item = new urlModel({
                originalUrl,
                shortUrl,
                urlCode,
            });
            item.save();
            res.status(200).json({
                originalUrl,
                shortUrl,
                urlCode,
            });
        }

    });
};
