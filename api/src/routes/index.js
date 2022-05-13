const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperamento } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
//instancia del router queda escuchando los reques y de ahi va a decir donde va a ir y que va hacer

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
  const dbDog = await Dog.findAll({ include: [Temperamento] });
  const { name } = req.query;

  if (name) {
    try {
      const DogDB = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [Temperamento],
      });
      console.log(name)
      const DogApi = await apiDogs.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      console.log(DogApi);

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
            temperament: e.temperament,
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
            añosDeVida: e.life_span,
            image: e.image.url,
            temperament: e.temperament,
          };
        });

        if (dbDog) {
          const dogBody = await dbDog.concat(hay);

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
    

      if (id.includes("-")) {
        let DogDB = [];
        DogDB.push(
          await Dog.findByPk(id, {
            include: [Temperamento],
          })
        );
        console.log(DogDB);

        res.status(200).send(DogDB);
      } else {
        const DogApi = await apiDogs.filter((e) => e.id == id);
        console.log(DogApi);
        const dog1 = await DogApi.map((e) => {
          return {
            id: e.id,
            name: e.name,
            altura: e.height.metric,
            peso: e.weight.metric,
            añosDeVida: e.life_span,
            image: e.image.url,
            temperament: e.temperament ? e.temperament : "No temperament !!",
          };
        });
        console.log(dog1);
        res.status(200).send(dog1);
      }
    }
  } catch (error) {
    console.log("ERROR EN ID:", error);
  }
});
router.post("/dog", async (req, res) => {
  const { name, altura, peso, añosDeVida, image, nameTemp } = req.body;
  if (!name && !altura && !peso) {
    res.status(404).send("Debes ingresar: Name, Altura y peso!!");
  }
  try {
    const dogCreate = await Dog.create({
      name: name,
      altura: altura,
      peso: peso,
      añosDeVida: añosDeVida,
      image: image
        ? image
        : "https://media.istockphoto.com/photos/maltese-dog-puppy-picture-id961585286?k=20&m=961585286&s=612x612&w=0&h=9pNSBbt1WWTUXRHqzT57FEfh7WoAuWFGIqgLNikwty0=",
    });
    const dogTemperamento = await Temperamento.findAll({
      where: {
        name: nameTemp,
      },
    });

    dogCreate.addTemperamento(dogTemperamento);

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
        res.status(200).send(tempDb);
      } else {
        res.status(404).send("ERROR AQUI!!");
      }
    } else {
      res.status(200).send(dbTemp);
    }
  } catch (error) {
    console.log("ERROR EN TEMPERAMENT: ", error);
  }
});



module.exports = router;
