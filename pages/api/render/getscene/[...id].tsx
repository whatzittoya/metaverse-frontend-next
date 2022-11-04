const api = process.env.NEXT_PUBLIC_API;
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
          res.status(200).json(JSON.parse(data.data.json));
        });
    }
  }
}
