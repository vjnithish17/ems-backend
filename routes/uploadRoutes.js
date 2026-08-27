const express = require("express");
const router = express.Router();


const upload = require("../middlewares/uploadMiddleware");

router.post("/",upload.single("image"),(req, res) => {

        res.json({
            message: "File Uploaded",
            file: req.file
        });
    }
);

module.exports = router;
