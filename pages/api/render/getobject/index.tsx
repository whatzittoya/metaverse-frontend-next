const api = process.env.NEXT_PUBLIC_API_LOCAL;
const token = process.env.NEXT_PUBLIC_TOKEN;
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (id !== null) {
      fetch(
        `${api}items/object?fields=name,width,height,image,category.name&filter[category][name][_nin]=window,door`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((r) => r.json())
        .then((data) => {
          const data_w_url = data.data.map((d) => {
            d.image_url = `${api}assets/${d.image}`;
            return d;
          });
          res.status(200).json({ data: data_w_url });
        });
    }
  }
}
