# API Node.js – Testes de Performance com K6

Trabalho de Conclusão da Disciplina  
Testes de Performance

---

## Sobre o Projeto

Este projeto consiste em uma API desenvolvida em Node.js com Express.js, acompanhada de testes automatizados de performance utilizando a ferramenta K6.

O objetivo do trabalho é demonstrar, de forma prática, a aplicação dos principais conceitos de testes de performance exigidos pela disciplina, incluindo controle de carga, validações, métricas customizadas, reaproveitamento de dados, organização de cenários e geração de relatório em HTML.

A API roda localmente na porta 3000 e expõe endpoints utilizados nos testes de performance para validação de comportamento sob carga.

---

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- JSON Web Token (JWT)

### Testes de Performance
- K6

### Relatórios
- K6 Web Dashboard (HTML)

---

## Instalação e Execução da API

### Pré-requisitos
- Node.js versão 16 ou superior
- npm
- K6 instalado no sistema

### Instalar dependências

```powershell
npm install
```

### Iniciar o servidor

```powershell
npm start
```

A API ficará disponível em:

http://localhost:3000

---

## Estrutura do Projeto

```
new_api_project/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controller/
│   │   ├── userController.js
│   │   └── transferController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── model/
│       └── userModel.js
├── test/
│   └── k6/
│       ├── login.test.js
│       ├── performance.test.js
│       ├── helpers/
│       │   ├── auth.js
│       │   └── baseUrl.js
│       └── data/
│           └── login.test.data.json
├── reports/
│   ├── html-report.html
│   └── report.json
├── package.json
└── README.md
```

---

## Testes de Performance com K6

Este projeto implementa os principais conceitos de testes de performance utilizando K6.

### Thresholds

```javascript
export let options = {
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};
```

### Checks

```javascript
check(response, {
  'status é 200': (r) => r.status === 200,
});
```

---

## Variáveis de Ambiente

```javascript
export function getBaseUrl() {
  return __ENV.BASE_URL || 'http://localhost:3000';
}
```

Execução:

```powershell
$env:BASE_URL="http://localhost:3000"
k6 run test/k6/login.test.js
```

---

## Geração de Relatório HTML

```powershell
New-Item -ItemType Directory -Force -Path "reports"
$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="reports/html-report.html"
k6 run test/k6/login.test.js
```

---

## Relatórios Gerados

```
reports/
├── html-report.html
└── report.json
```

Visualização:

```powershell
start reports/html-report.html
```

---

## Autor

Dayane Lopes  
Trabalho de Conclusão da Disciplina  
Testes de Performance com K6
