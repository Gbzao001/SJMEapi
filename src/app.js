const express = require('express');
const admin = require("../infra/conexao"); // Importe o módulo admin

const app = express();

app.use(express.json());

app.get('/livros', (req, res) => {
    const db = admin.database();
    const ref = db.ref('livros');
  
    ref.once('value', (snapshot) => {
      const livros = snapshot.val();
      res.json(livros);
    }, (error) => {
      res.status(500).json({ error: 'Erro ao obter livros do Firebase' });
    });
});

app.get('/livros/:id', (req, res) => {
  const livroId = req.params.id; // Obtém o ID do livro dos parâmetros da rota
  const db = admin.database();
  const ref = db.ref(`livros/${livroId}`); // Referência ao livro específico no Firebase

  ref.once('value', (snapshot) => {
      const livro = snapshot.val();
      if (livro) {
          res.json(livro); // Retorna o livro se encontrado
      } else {
          res.status(404).json({ error: 'Livro não encontrado' }); // Retorna um erro se o livro não for encontrado
      }
  }, (error) => {
      res.status(500).json({ error: 'Erro ao obter o livro do Firebase' }); // Retorna um erro se houver um problema com a consulta ao Firebase
  });
});




app.get('/livros/:id/:numero', (req, res) => {
  const livroId = req.params.id; // Obtém o ID do livro dos parâmetros da rota
  const numero = req.params.numero; // Obtém o número especificado dos parâmetros da rota
  const db = admin.database();
  const ref = db.ref(`livros/${livroId}/numeros/${numero}`); // Referência ao número específico do livro no Firebase

  ref.once('value', (snapshot) => {
      const trecho = snapshot.val();
      if (trecho) {
          res.json({ numero, trecho }); // Retorna o trecho correspondente ao número
      } else {
          res.status(404).json({ error: 'Trecho não encontrado neste livro' }); // Retorna um erro se o trecho não for encontrado
      }
  }, (error) => {
      res.status(500).json({ error: 'Erro ao obter o trecho do Firebase' }); // Retorna um erro se houver um problema com a consulta ao Firebase
  });
});







module.exports = app;
