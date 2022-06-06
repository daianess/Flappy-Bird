console.log('Flappy Bird')

const somHit = new Audio()
somHit.src = './efeitos/hit.wav'

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// Plano de Fundo

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,

      planoDeFundo.largura,
      planoDeFundo.altura,

      planoDeFundo.x,
      planoDeFundo.y,

      planoDeFundo.largura,
      planoDeFundo.altura
    )

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,

      planoDeFundo.largura,
      planoDeFundo.altura,

      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y,

      planoDeFundo.largura,
      planoDeFundo.altura
    )
  }
}

// Chão

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX,
      chao.spriteY,

      chao.largura,
      chao.altura,

      chao.x,
      chao.y,

      chao.largura,
      chao.altura
    )

    contexto.drawImage(
      sprites,
      chao.spriteX,
      chao.spriteY,

      chao.largura,
      chao.altura,

      chao.x + chao.largura,
      chao.y,

      chao.largura,
      chao.altura
    )
  }
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura
  const chaoY = chao.y

  if (flappyBirdY >= chaoY) {
    return true
  }

  return false
}

// Bird

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    jump() {
      console.log('Devo pular')
      flappyBird.velocidade = -flappyBird.pulo
    },
    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
      if (fazColisao(flappyBird, chao)) {
        console.log('Fez colisão')
        somHit.play()
        setTimeout(() => {
          mudaParaTela(telas.inicio)
        }, 500)
        mudaParaTela(telas.inicio)
        return
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.y = flappyBird.y + flappyBird.velocidade
    },

    desenha() {
      contexto.drawImage(
        sprites,

        flappyBird.spriteX, // Sprite X, Sprite Y
        flappyBird.spriteY,

        flappyBird.largura, // Tamanho do recorte na sprite
        flappyBird.altura,

        flappyBird.x, // Posição do Bird na página
        flappyBird.y,

        flappyBird.largura,
        flappyBird.altura
      )
    }
  }

  return flappyBird
}

// Tela de inicio

const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,

  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX,
      mensagemGetReady.sY,

      mensagemGetReady.w,
      mensagemGetReady.h,

      mensagemGetReady.x,
      mensagemGetReady.y,

      mensagemGetReady.w,
      mensagemGetReady.h
    )
  }
}

// Telas
const globais = {}

let telaAtiva = {}
function mudaParaTela(novaTela) {
  telaAtiva = novaTela

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa()
  }
}

const telas = {
  inicio: {
    inicializa() {
      globais.flappyBird = criaFlappyBird()
    },

    desenha() {
      planoDeFundo.desenha()
      chao.desenha()
      globais.flappyBird.desenha()
      mensagemGetReady.desenha()
    },

    click() {
      mudaParaTela(telas.jogo)
    },
    atualiza() {}
  }
}

telas.jogo = {
  desenha() {
    planoDeFundo.desenha()
    chao.desenha()
    globais.flappyBird.desenha()
  },
  click() {
    globais.flappyBird.jump()
  },
  atualiza() {
    globais.flappyBird.atualiza()
  }
}

function loop() {
  telaAtiva.desenha()
  telaAtiva.atualiza()
  requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click()
  }
})

mudaParaTela(telas.inicio)

loop()
