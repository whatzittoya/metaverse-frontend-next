const api = process.env.NEXT_PUBLIC_API_LOCAL;
const token = process.env.NEXT_PUBLIC_TOKEN;
export default async function handler(req, res) {
  if (req.method === "GET") {
    fetch(`${api}items/design`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        res.status(200).json(data);
      });
  }
}
