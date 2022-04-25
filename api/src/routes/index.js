const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperamento } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const api = async () => {
  const arr = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  return arr.data;
};

router.get("/dogs", async (req, res) => {
  const apiDogs = await api();
  const dbDog = await Dog.findAll();
  const { name } = req.query;

  if (name) {
    try {
      const DogDB = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      const DogApi = await apiDogs.filter((e) => e.name === name);

      if (DogApi.length === 0 && DogDB.length === 0) {
        res
          .status(404)
          .send("The breed of dog you are looking for does not exist!");
      } else if (DogDB) {
        res.status(200).send(DogDB);
      } else {
        res.status(200).send(DogApi);
      }
    } catch (error) {
      console.log("ERROR EN GET:", error);
    }
  } else if (name == 0) {
    res
      .status(404)
      .send("You must enter the name of the breed of dog you are looking for");
  } else {
    try {
      if (!apiDogs.length && !dbDog.length) {
        res
          .status(404)
          .send("Cannot display the Dogs list, please try again later...");
      } else {
        const hay = await apiDogs?.map((e) => {
          return {
            id: e.id,
            name: e.name,
            altura: e.height.metric,
            peso: e.weight.metric,
            año_de_vida: e.life_span,
            image: e.image.url,
          };
        });

        if (dbDog) {
          const dogBody = await hay.concat(dbDog);

          res.status(200).send(dogBody);
        } else {
          res.status(200).send(hay);
        }
      }
    } catch (error) {
      console.log("ERROR EN /DOGS :", error);
    }
  }
});

// router.get("/dogs?name=", async (req, res) => {
//   // const apiDogs = await api();
//   const { name } = req.query;
//   if (name) {
//     try {
//       const DogDB = await Dog.findOne({
//         where: {
//           name: {
//             [Op.iLike]: `%${name}%`,
//           },
//         },
//       });
//       const DogApi =  await apiDogs.filter((e) => {
//         if (e.name === name) {
//           return name;
//         }
//       });

//       if (DogDB) {
//         res.status(200).send(DogDB);
//       }
//       else if (DogApi) {
//         res.status(200).send(DogApi);
//       }
//        else {
//         res
//           .status(404)
//           .send("The breed of dog you are looking for does not exist!");
//       }
//     } catch (error) {
//       console.log("ERROR EN GET:", error);
//     }
//   }
// });

router.get("/dogs/id");

router.get("/temperament");

router.post("/dog");

module.exports = router;
