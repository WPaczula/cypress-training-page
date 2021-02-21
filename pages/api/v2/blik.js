export default (req, res) => {
  if (req.method === "POST") {
    setTimeout(() => {
      res.status(200).json({ message: "BLIK sent correctly" });
    }, 5000);
    // res.status(403).json({ code: "lack_of_funds" });
    // res.status(404).json({ code: "number_not_found" });
  }
};
