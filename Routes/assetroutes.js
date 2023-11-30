const router = require('express').Router();

const AssetRequired = require('../model/assetmodel.js');

router.post("/assetrequired", async (req, res) => {
    var users = new AssetRequired();
    users.AssetsName = req.body.AssetsName;
    users.Purpose = req.body.Purpose;
    users.Need = req.body.Need;
    users.OrderedBy = req.body.OrderedBy;
    users.RequestedBy = req.body.RequestedBy;
    try {
        await users.save();
        res.status(201).json({
            message: 'New Asset Required Successfully',
            data: users,
        });
    } catch (err) {
        res.status(400).json({
            message: 'Error adding new asset',
            error: err.message,
        });
    }
});

var assetcontroller = require("../controller/assetcontroller.js");
router.route("/assetreq/getall").get(assetcontroller.index);

router
  .route("/assetreq/:user_id")
  .get(assetcontroller.view)
  .patch(assetcontroller.update)
  .put(assetcontroller.update)
  .delete(assetcontroller.Delete);

module.exports = router;