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
      const DogApi = await apiDogs.filter(
        (e) => e.name.toLowerCase() == name.toLowerCase()
      );
      // console.log(DogApi);

      if (DogDB.length > 0) {
        res.status(200).send(DogDB);
      } else if (DogApi.length > 0) {
        const dog1 = await DogApi.map((e) => {
          return {
            id: e.id,
            name: e.name,
            altura: e.height.metric,
            peso: e.weight.metric,
            año_de_vida: e.life_span,
            image: e.image.url,
          };
        });
        console.log(dog1);
        res.status(200).send(dog1);
      } else {
        res
          .status(404)
          .send("The breed of dog you are looking for does not exist!");
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

router.get("/dogs/:id", async (req, res) => {
  const apiDogs = await api();
  const { id } = req.params;
  try {
    if (id == 0) {
      res.status(404).send("You must enter the ID");
    } else if (id) {
      const DogDB = await Dog.findByPk(id);
      const DogApi = await apiDogs.filter((e) => e.id == id);
      // console.log(DogApi);

      if (DogDB) {
        res.status(200).send(DogDB);
      } else if (DogApi.length > 0) {
        const dog1 = await DogApi.map((e) => {
          return {
            id: e.id,
            name: e.name,
            altura: e.height.metric,
            peso: e.weight.metric,
            año_de_vida: e.life_span,
            image: e.image.url,
          };
        });
        console.log(dog1);
        res.status(200).send(dog1);
      } else {
        res
          .status(404)
          .send("The breed of dog you are looking for does not exist!");
      }
    }
  } catch (error) {
    console.log("ERROR EN ID:", error);
  }
});
router.post("/dog", async (req, res) => {
  const { ID, name, altura, peso, año_de_vida, image, Temperamentos } =
    req.query;
  try {
    const dogCreate = await Dog.create({
      ID: ID,
      name: name,
      altura: altura,
      peso: peso,
      año_de_vida: año_de_vida,
      image: image,
    });

    const dogTemperamento = await Temperamento.findAll({
      where: {
        name: Temperamentos,
      },
    });

    dogCreate.addDog(dogTemperamento);

    res.status(200).send("Dog breed successfully created!");
  } catch (error) {
    console.log("ERROR EN POST: ", error);
  }
});

router.get("/temperament", async (req, res) => {
  const apiDogs = await api();

  try {
    const dbTemp = await Temperamento.findAll({ include: [Dog] });
    if (!dbTemp.length) {
      const prueba = await apiDogs
        ?.map((e) => e.temperament)
        .join()
        .split(",");

      const pruebaTEMP = await prueba.map((e) => e.trim());
      pruebaTEMP.forEach((e) => {
        if (e !== "") {
          Temperamento.findOrCreate({
            where: {
              name: e,
            },
          });
        }
      });
      const tempDb = await Temperamento.findAll();
      if (tempDb) {
        console.log(tempDb)
        res.status(200).send(tempDb);
      } else {
        res.status(404).send("ERROR AQUI!!");
      }
    } else {
      console.log(dbTemp)
      res.status(200).send(dbTemp);
    }
  } catch (error) {
    console.log("ERROR EN TEMPERAMENT: ", error);
  }
});

module.exports = router;
