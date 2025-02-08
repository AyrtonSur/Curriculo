let typeWriterTimeout

function typeWriter(text, element, delay = 20) {
  element.textContent = ''
  let i = 0

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      typeWriterTimeout = setTimeout(type, delay)
    }
  }

  clearTimeout(typeWriterTimeout)
  type()
}

document.addEventListener('DOMContentLoaded', (event) => {
  const buttons = document.querySelectorAll('.divAbilities button')

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const abilityName = button.querySelector('.abilityName').textContent
      const abilityText = document.querySelector('#abilityText')

      buttons.forEach(btn => {
        const img = btn.querySelector('img')
        if (img) {
          img.classList.remove('curAbility')
        }
      });

      const img = button.querySelector('img')
      if (img) {
        img.classList.add('curAbility')
      }

      let text = ''
      switch (abilityName) {
        case 'Python':
          text = 'Tenho conhecimento básico de Python e experiência com algumas bibliotecas, como Numpy e Pygame.'
          break
        case 'Java':
          text = 'Conhecimento básico de Java, já fiz um único jogo na linguagem, além de ter estudado sobre a linguagem para a faculdade.'
          break
        case 'TypeScript':
          text = 'Uso TypeScript para desenvolvimento de aplicações back-end, atualmente é a linguagem que mais utilizo, além de ser a que tenho mais experiência prática. Já fiz alguns projetos na linguagem.'
          break
        case 'JavaScript':
          text = 'JavaScript é uma linguagem que tenho grande conhecimento sobre. Já tive experiência fazendo alguns projetos em JavaScript. Esses projetos utilizaram principalmente: Sequelize, SQLite e Express.'
          break
        case 'C':
          text = 'Tenho conhecimento em C por causa da faculdade, já fiz alguns programas simples e algumas estruturas na linguagem, como árvores B ou árvore binárias de busca.'
          break
        case 'Rust':
          text = 'Rust é uma das minhas linguagens favoritas, porém ainda não tenho tanto conhecimento nela, quanto nas outras linguagens. Atualmente estou tentando estudar mais sobre a linguagem para, futuramente, começar a fazer projetos interessantes dentro dela.'
          break
        case 'Node.Js':
          text = 'Uso Node.js para desenvolvimento de servidores e aplicações back-end, sendo minha principal ferramenta para tal.'
          break
        case 'React':
          text = 'Tenho um bom conhecimento de React, porém estou mais acostumado a utilizar o próprio HTML, do que o React.'
          break
        case 'DataBase':
          text = 'Tenho experiência com bancos de dados relacionais, sabendo um pouco sobre MySQL e MariaDB, porém minhas principais experiências com Banco de Dados foram utilizando ORMs.'
          break
        case 'HTML':
          text = 'Tenho bom conhecimento em HTML para construção de páginas web estruturadas e semânticas.'
          break
        case 'CSS':
          text = 'Conhecimento intermediário de CSS, conseguindo estilizar páginas de forma que fiquem bem estruradas.'
          break
        default:
          text = 'Selecione uma habilidade para ver mais detalhes.'
      }

      typeWriter(text, abilityText)
    })
  })
})


document.addEventListener('DOMContentLoaded', (event) => {
  const textElement = document.querySelector('.animated-text')
  const text = textElement.textContent
  textElement.innerHTML = ''

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span')
    if (text[i] === ' ') {
      span.innerHTML = '&nbsp;'
    } else {
      span.textContent = text[i]
    }
    span.style.animationDelay = `${i * 0.1}s`
    textElement.appendChild(span)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger')
  const navMenu = document.getElementById('nav-menu')

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('show')
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const animatedElementLeft = document.querySelector('.animated-element-right')
  const animatedElementRight = document.querySelector('.animated-element-left')
  const div = document.querySelector('.aboutme')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animatedElementLeft.classList.add('enter')
        animatedElementLeft.classList.remove('exitRight')
        animatedElementRight.classList.add('enter')
        animatedElementRight.classList.remove('exitLeft')
      } else {
        animatedElementLeft.classList.add('exitRight')
        animatedElementLeft.classList.remove('enter')
        animatedElementRight.classList.add('exitLeft')
        animatedElementRight.classList.remove('enter')
      }
    })
  })

  observer.observe(div);
})


document.addEventListener('DOMContentLoaded', () => {
  const divObserved = document.querySelector('.aboutme')
  const div = document.querySelector('.tecnologies')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        div.classList.add('showWithDelay')
        div.classList.remove('hidden')
      } else {
        div.classList.add('hidden')
        div.classList.remove('showWithDelay')
      }
    })
  })

  observer.observe(divObserved);
})

document.addEventListener('DOMContentLoaded', () => {
  const div = document.querySelector('.abilities')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        div.classList.add('show')
        div.classList.remove('hidden')
      } else {
        div.classList.add('hidden')
        div.classList.remove('show')
      }
    })
  })

  observer.observe(div);
})
