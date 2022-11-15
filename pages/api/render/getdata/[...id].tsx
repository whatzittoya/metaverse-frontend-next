export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = [
      {
        _id: "6372fd457380d2b9f60e7fcc",
        company: "GEEKKO",
        email: "wolfeshort@geekko.com",
        phone: "+1 (839) 532-2626",
        address: "445 Harbor Court, Bentley, North Dakota, 3339",
        about: "amet culpa magna",
      },
      {
        _id: "6372fd45bb18ade3adca6c5f",
        company: "COMTOURS",
        email: "wolfeshort@comtours.com",
        phone: "+1 (931) 527-3068",
        address: "828 Lee Avenue, Cotopaxi, Palau, 3229",
        about: "ipsum proident aute",
      },
      {
        _id: "6372fd4593ed1881543b3729",
        company: "COSMETEX",
        email: "wolfeshort@cosmetex.com",
        phone: "+1 (895) 488-2955",
        address: "107 Bond Street, Delco, District Of Columbia, 4092",
        about: "eu nostrud dolor",
      },
      {
        _id: "6372fd451c950e85906de7b4",
        company: "ATOMICA",
        email: "wolfeshort@atomica.com",
        phone: "+1 (968) 556-2842",
        address: "242 Meserole Street, Chilton, North Carolina, 8164",
        about: "incididunt elit ad",
      },
      {
        _id: "6372fd45c653a0d858130f76",
        company: "ORBALIX",
        email: "wolfeshort@orbalix.com",
        phone: "+1 (837) 449-2507",
        address: "449 Gunnison Court, Cecilia, South Dakota, 5975",
        about: "excepteur et aliqua",
      },
    ];
    const { id } = req.query;
    if (id !== null) {
      res.status(200).json({ ...data[id] });
    }
  }
}
