import { http } from 'k6';
import { check } from 'k6';
import { Faker } from 'k6/x/faker'; // Importação do Faker

const fakerGen = new Faker(); // Instanciando o Faker
const BASE_URL = 'http://localhost:3000'; // Porta ajustada para a API

export default function () {
  // Gerando um nome de usuário e senha fictícios com Faker
  const username = fakerGen.person.firstName();
  const password = fakerGen.person.firstName() + '123'; // Senha fictícia simples

  // Realiza uma requisição POST para o login com o nome de usuário e senha gerados
  let response = http.post(`${BASE_URL}/users/login`, { username, password });

  // Verifica se o status da resposta é 200 (sucesso)
  check(response, {
    'login status 200': (r) => r.status === 200,
    'token recebido': (r) => r.json('token') !== undefined,
  });

  // Se o login for bem-sucedido, testa outras rotas (por exemplo, listagem de usuários)
  if (response.status === 200) {
    const token = response.json('token'); // Obtendo o token JWT

    // Realiza um GET para listar os usuários, incluindo o token no cabeçalho de autorização
    let usersResponse = http.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Verifica se a resposta foi bem-sucedida
    check(usersResponse, {
      'users status 200': (r) => r.status === 200,
      'users retornados': (r) => r.json().length > 0, // Verifica se a lista de usuários não está vazia
    });
  }

  // Aqui podemos adicionar mais verificações ou testes conforme necessário, como criação de recursos
}
