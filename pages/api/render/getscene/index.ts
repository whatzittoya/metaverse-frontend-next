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
    fetch(
      `${api}items/design/?fields=id,name,user_created.first_name&filter[status][_eq]=Published`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((r) => r.json())
      .then((data) => {
        const result = data.data.map((obj) => {
          if ("user_created" in obj) {
            obj.author = obj.user_created.first_name;
          }
          delete obj.user_created;
          obj.json = `${req.headers.host}/api/render/getscene/${obj.id}`;
          return obj;
        });

        res.status(200).json(result);
      });
  }
}
