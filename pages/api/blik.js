export default (req, res) => {
  if (req.method === "POST") {
    res.status(200).json({ message: "BLIK sent correctly" });
    // res.status(403).json({ code: "lack_of_funds" });
    // res.status(404).json({ code: "number_not_found" });
  }
};
