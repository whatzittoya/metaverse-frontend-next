import NextCors from "nextjs-cors";

const api = process.env.NEXT_PUBLIC_API_LOCAL;
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
      fetch(`${api}items/design/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          const data_json = JSON.parse(data.data.json);
          console.log(data_json);
          data_json.floors[0].furnitureArray =
            data_json.floors[0].furnitureArray.map((obj) => {
              const height = obj.height * 100;
              obj.y += height / 2;
              obj.y = obj.y * -1;

              const width = obj.width * 100;
              obj.x += width / 2;
              return obj;
            });
          data_json.floors[0].wallNodes = data_json.floors[0].wallNodes.map(
            (obj) => {
              if ("y" in obj) {
                obj.y = obj.y * -1;
              }
              return obj;
            }
          );
          if ("person" in data_json) {
            data_json.person.y *= -1;
          }
          res.status(200).json(data_json);
        });
    }
  }
}
