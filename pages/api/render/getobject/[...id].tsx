import NextCors from "nextjs-cors";

const api = process.env.NEXT_PUBLIC_API_IP;
const token = process.env.NEXT_PUBLIC_TOKEN;
export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === "GET") {
    const { id } = req.query;
    if (id !== null) {
      fetch(`${api}items/object/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          res.status(200).json(JSON.parse(data.data));
        });
    }
  }
}
