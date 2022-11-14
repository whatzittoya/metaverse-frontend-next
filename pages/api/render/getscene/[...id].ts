const api = process.env.NEXT_PUBLIC_API_LOCAL;
const token = process.env.NEXT_PUBLIC_TOKEN;
export default async function handler(req, res) {
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
              obj.y = obj.y * -1;
              return obj;
            });

          res.status(200).json(data_json);
        });
    }
  }
}
