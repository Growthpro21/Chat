const chat = document.getElementById('chat');
const buttons = document.getElementById('buttons');
const onlineCount = document.getElementById('online-count');
function gerarBasePorHorario() {
      const hora = new Date().getHours();

      if (hora >= 6 && hora < 12) return 90 + Math.floor(Math.random() * 30);   // manhã
      if (hora >= 12 && hora < 18) return 120 + Math.floor(Math.random() * 40); // tarde
      if (hora >= 18 && hora < 23) return 150 + Math.floor(Math.random() * 60); // noite
      return 30 + Math.floor(Math.random() * 20); // madrugada
    }

    function getOnlineBase() {
      const hoje = new Date().toISOString().split('T')[0];
      const saved = JSON.parse(localStorage.getItem('onlineData'));

      if (saved && saved.data === hoje) {
        return saved.valor;
      } else {
        const novoValor = gerarBasePorHorario();
        localStorage.setItem('onlineData', JSON.stringify({ data: hoje, valor: novoValor }));
        return novoValor;
      }
    }

    let online = getOnlineBase();

    setInterval(() => {
      const variacao = Math.floor(Math.random() * 7 - 3); // -3 até +3
      online += variacao;

      if (online < 10) online = 10;
      if (online > 350) online = 350;

      document.getElementById('online-count').textContent = `${online}`;
    }, 3000);

    document.getElementById('online-count').textContent = `${online}`;


function addBotMessage(text, callback) {
  const msg = document.createElement('div');
  msg.classList.add('message', 'bot-message');
  const typing = document.createElement('div');
  typing.textContent = 'Digitando...';
  typing.classList.add('message', 'bot-message');
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    chat.removeChild(typing);
    msg.innerHTML = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
    if (callback) callback();
  }, 1200);
}

function addUserMessage(text) {
  const msg = document.createElement('div');
  msg.classList.add('message', 'user-message');
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function setButtons(options) {
  buttons.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.label;
    btn.onclick = () => {
      addUserMessage(opt.label);
      buttons.innerHTML = '';
      opt.action();
    };
    buttons.appendChild(btn);
  });
}

function startConversation() {
  addBotMessage('Olá, seja muito bem-vindo! 👋<br>Você caiu direto no meu chat pessoal. Poucas pessoas têm esse acesso, então aproveita que é especial.', () => {
    addBotMessage('Me conta, como chegou até aqui?', () => {
      setButtons([
        { label: 'TikTok', action: () => veioDe('TikTok') },
        { label: 'Instagram', action: () => veioDe('Instagram') },
        { label: 'Recomendação', action: () => veioDe('Recomendação') }
      ]);
    });
  });
}

function veioDe(origem) {
  addBotMessage(`Veio pelo ${origem}? Excelente escolha. 😊`, () => {
    addBotMessage('Você ja tem alguma experiência com o marketing digital?', () => {
      setButtons([
        { label: 'Sim', action: conheceMarketing },
        { label: 'Não', action: naoConheceMarketing }
      ]);
    });
  });
}

function conheceMarketing() {
  addBotMessage('Perfeito! Então você já tem uma noção que dá pra ganhar dinheiro com o celular, né?', () => {
    prosseguirHistoria();
  });
}

function naoConheceMarketing() {
  addBotMessage('Marketing digital é basicamente usar a internet para vender. Com as estratégias certas, você pode transformar seu celular em uma fonte de renda. 💰', () => {
    prosseguirHistoria();
  });
}

function prosseguirHistoria() {
  addBotMessage('Tenho 22 anos e estou nesse mercado há 5 meses. e confesso que no começo foi bem difícil... testei varias estratégias, comprei cursos... e nada funcionava.', () => {
    addBotMessage('Até que descobri um aplicativo que já vem com tudo pronto: estratégias validadas, funil de vendas e produtos que realmente vendem.', () => {
      addBotMessage('Seguindo o passo a passo lá, consegui gerar R$ 2.000 em apenas 3 dias.', () => {
        addBotMessage('A chance que transformou minha vida há 5 meses está de volta — e ainda mais completa! Mas atenção: é por tempo limitado. Clique no botão abaixo e descubra.', () => {
          setButtons([
            // Aqui removi a opção de mostrar resultados conforme seu pedido
            { label: 'Continuar', action: mostrarOferta }
          ]);
        });
      });
    });
  });
}

function mostrarOferta() {
  addBotMessage(`
    Agora deixa eu te contar uma coisa que pode realmente mudar a sua vida...<br><br>

    O app que eu uso e recomendo, chamado <strong>Growthpro</strong>, não é só mais uma plataforma qualquer. Ele é um guia completo pra quem quer aprender a ganhar dinheiro com marketing digital, mesmo sem experiência.<br><br>

    Ele foi feito pra pessoas comuns, que querem começar com o que têm — um celular e força de vontade.
  `, () => {
    addBotMessage(`
      Dentro do app você vai encontrar:<br><br>
      ✅ Estratégias testadas que funcionam mesmo pra iniciantes<br>
      ✅ Roteiros prontos pra criar vídeos virais sem precisar aparecer<br>
      ✅ Produtos digitais prontos para divulgar e vender<br>
      ✅ Um passo a passo do básico até sua primeira venda<br>
      ✅ Suporte direto com quem já está no mercado<br><br>

      Ou seja, tudo o que você precisa pra começar do zero e ter resultados de verdade.
    `, () => {
      addBotMessage(`
        E olha... Essa é exatamente a <strong>mesma oportunidade</strong> que eu tive há 5 meses atrás.<br>
        Eu também não sabia se ia dar certo, mas decidi tentar. E hoje, graças a isso, minha realidade começou a mudar.<br><br>

        Agora essa chance está aqui, na sua frente. Você só precisa dar o primeiro passo.
      `, () => {
        addBotMessage(`
          Mas atenção!<br><br>
          Só restam <strong>200 vagas</strong> disponíveis pra essa nova turma.<br>
          E quem entrar ainda <strong>hoje</strong> pelo meu link exclusivo vai garantir <strong>20% de desconto</strong> na inscrição. 🔥
        `, () => {
          setButtons([
            {
              label: 'Quero garantir minha vaga com desconto 🔥',
              action: () => {
                window.location.href = 'https://pay.cakto.com.br/ubyrme7_402004'; // Substitua pelo seu link de venda
              }
            },
            {
              label: 'Falar com o responsável',
              action: () => {
                window.location.href = 'https://wa.me/5562995297173'; // Substitua pelo seu número
              }
            }
          ]);
        });
      });
    });
  });
}



startConversation();
