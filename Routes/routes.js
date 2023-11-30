const router = require('express').Router();

const Asset = require('../model/model.js');

router.post("/addasset", async(req, res) => {
    var user = new Asset();
    user.AssetNumber  = req.body.AssetNumber;
    user.AssetId      = req.body.AssetId;
    user.Category     = req.body.Category;
    user.SubCategory  = req.body.SubCategory;
    user.Model        = req.body.Model;
    user.AssignedTo   = req.body.AssignedTo;
    user.AssignedBy   = req.body.AssignedBy;
    user.AssignedDate = req.body.AssignedDate;
    user.Price        = req.body.Price;
    user.Status       = req.body.Status;
    try {
        await user.save();
        res.status(201).json({
            message: 'New Asset Added Successfully',
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            message: 'Error adding new asset',
            error: err.message,
        });
    }
});

var controller = require("../controller/controller.js");
router.route("/assets/getall").get(controller.index);

router
  .route("/assets/:user_id")
  .get(controller.view)
  .patch(controller.update)
  .put(controller.update)
  .delete(controller.Delete);

module.exports = router;