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
      const DogApi = apiDogs.filter((e) => {
        if (e.name === name) {
          return e.name;
        }
      });
    } catch (error) {
      console.log("ERROR EN GET:", error);
    }
  }
});

router.get("/dogs?name=");

router.get("/dogs/id");

router.get("/temperament");

router.post("/dog");

module.exports = router;
