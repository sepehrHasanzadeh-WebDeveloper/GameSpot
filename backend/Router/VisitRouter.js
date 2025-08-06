const express = require("express");
const VisitModel = require("../Models/ChartModel");
const router = express.Router();

router.post("/track", async (req, res) => {
  try {
    const { path } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const newVisit = new VisitModel({ path, ip, userAgent });
    await newVisit.save();

    res.status(201).json({ message: "Visit logged" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/daily", async (req, res) => {
  try {
    const visits = await VisitModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result = visits.map((v) => ({
      date: v._id,
      views: v.views,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});
module.exports = router;
