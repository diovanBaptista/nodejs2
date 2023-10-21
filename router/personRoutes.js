const router = require('express').Router()
const Person = require("../model/person");

// crate de dados
router.post("/", async (req, res) => {
  const { name, salary, approvad } = req.body;
  if (!name) {
    res.status(422).json({ message: "O nome é OBRIGATORIO!" });
    return
  }
  const person = {
    name,
    salary,
    approvad,
  };
  try {
    await Person.create(person);
    res
      .status(201)
      .json({ message: "Pessoa Inserida com sucesso", person: person });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/', async (req,res) => {
  try {
    const people = await Person.find()
    res.status(200).json({message: "Requisição concluida com  sucesso", pessoas: people})
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

router.get('/:name', async (req,res) => {
  const name = req.params.name
  
  try {
    const person = await Person.findOne({ name: name})
    if(!person) {
      res.status(404).json({messagr:"Usuário não encontrado"})
      return
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
})


router.patch('/:id', async (req,res) => {
  const id = req.params.id;
  const { name, salary, approvad } = req.body;
  const person = {
    name,
    salary,
    approvad,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ erro: error });
  }

})


router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ message: "Usuário não encontrado!" });
    return;
  }
  try {
    await Person.deleteOne({_id:id})
    res.status(200).json({message: 'Usuário excluido com sucessp'})
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = router