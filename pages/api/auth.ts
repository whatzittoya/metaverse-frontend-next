import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_LOCAL;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      fetch(`${api}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: req.body.email,
          password: req.body.password,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          const token = data.data.access_token;
          fetch(`${api}users/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((r) => r.json())
            .then((data_user) => {
              res.status(200).json({ user: data_user, token });
            });
        });
    } catch (err) {
      res.status(500).send({ error: "failed to fetch data" });
    }
  } else {
  }
}
