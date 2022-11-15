export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = [
      {
        status: "Online",
      },
      {
        status: "Offline",
      },
      {
        status: "Working",
      },
      {
        status: "Not responding",
      },
      {
        status: "Broken",
      },
    ];
    const { id } = req.query;
    if (id !== null) {
      res.status(200).json({ ...data[id] });
    }
  }
}
