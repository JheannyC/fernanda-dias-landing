<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const menuOpen = ref(false)
const activeServiceIndex = ref(0)
const touchStartX = ref(null)
let revealObserver

const services = [
  {
    name: 'Maquiagem express',
    price: 'R$ 85,00',
    image: '/images/express.png',
    imageAlt: 'Maquiagem express com acabamento natural',
    description:
      'Uma produção prática para realçar sua beleza com leveza, mesmo quando o tempo é curto.',
    includes: ['Não inclui cílios', 'Não inclui delineado'],
  },
  {
    name: 'Maquiagem social',
    price: 'R$ 129,99',
    image: '/images/social.png',
    imageAlt: 'Maquiagem social com olhos iluminados',
    description:
      'Pele preparada, olhos e lábios em destaque e um acabamento elegante para ocasiões especiais.',
    includes: ['Inclui cílios', 'Inclui delineado'],
  },
  {
    name: 'À prova d’água',
    price: 'R$ 159,99',
    image: '/images/waterproof.png',
    imageAlt: 'Maquiagem resistente à água para longa duração',
    description:
      'Feita para resistir à umidade, ao calor e às lágrimas, mantendo o visual impecável por horas.',
    includes: ['Inclui cílios', 'Inclui delineado'],
  },
]

const whatsappUrl =
  'https://wa.me/5583986515567?text=Ol%C3%A1%2C%20Fernanda!%20Quero%20agendar%20uma%20maquiagem.'

onMounted(() => {
  const revealElements = document.querySelectorAll('.reveal')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
  )

  revealElements.forEach((element) => revealObserver.observe(element))
})

onBeforeUnmount(() => revealObserver?.disconnect())

function showService(index) {
  activeServiceIndex.value = (index + services.length) % services.length
}

function handleTouchStart(event) {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null
}

function handleTouchEnd(event) {
  if (touchStartX.value === null) return

  const distance = event.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(distance) > 40) {
    showService(activeServiceIndex.value + (distance < 0 ? 1 : -1))
  }
  touchStartX.value = null
}
</script>

<template>
  <div class="overflow-x-clip">
    <header class="sticky top-0 z-30 border-b border-ink/10 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a class="brand-mark" href="#inicio" aria-label="Fernanda Dias Makeup — início">
          <img class="brand-logo" src="/images/brand-logo.png" alt="" />
        </a>

        <button
          class="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:bg-lavender md:hidden"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="primary-navigation"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <svg v-if="!menuOpen" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          </svg>
          <svg v-else aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          </svg>
        </button>

        <nav
          id="primary-navigation"
          class="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-ink/10 bg-cream px-5 py-4 shadow-card md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none"
          :class="menuOpen ? 'flex' : 'hidden md:flex'"
          aria-label="Navegação principal"
        >
          <a class="nav-link" href="#servicos" @click="menuOpen = false">Serviços</a>
          <a class="nav-link" href="#atendimento" @click="menuOpen = false">Atendimento</a>
          <a class="nav-link" href="#contato" @click="menuOpen = false">Contato</a>
          <a class="button button-small mt-2 md:mt-0" :href="whatsappUrl" target="_blank" rel="noreferrer">
            Agendar horário
            <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 20 20" fill="none">
              <path d="M4.2 10h11.6m-4.7-4.7 4.7 4.7-4.7 4.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </nav>
      </div>
    </header>

    <main>
      <section id="inicio" class="hero-section relative">
        <div class="hero-orb hero-orb-one" aria-hidden="true"></div>
        <div class="hero-orb hero-orb-two" aria-hidden="true"></div>
        <div class="relative mx-auto grid max-w-7xl items-start gap-12 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:py-24">
          <div class="relative z-10 max-w-2xl reveal">
            <p class="eyebrow mb-6">
              <span class="eyebrow-line"></span>
              Maquiadora em Guarabira, PB
            </p>
            <h1 class="font-display text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-ink sm:text-6xl md:text-5xl lg:text-7xl xl:text-[5.5rem]">
              Olá, <span class="italic text-plum">Milady.</span>
              <span class="mt-2 block text-[0.72em] leading-[1.08]">Sua beleza merece ser celebrada.</span>
            </h1>
            <p class="mt-7 max-w-xl text-lg leading-8 text-ink/75 sm:text-xl">
              Sou Fernanda, maquiadora em Guarabira. Crio produções para ocasiões especiais, sempre com atenção ao que faz você se sentir bem.
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a class="button" :href="whatsappUrl" target="_blank" rel="noreferrer">
                Vamos agendar?
                <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                  <path d="M4.2 10h11.6m-4.7-4.7 4.7 4.7-4.7 4.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
              <a class="button button-outline" href="#servicos">Conheça os serviços</a>
            </div>
            <div class="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ink/10 pt-5 text-sm text-ink/65">
              <span class="inline-flex items-center gap-2">
                <svg aria-hidden="true" class="h-4 w-4 text-plum" viewBox="0 0 20 20" fill="none">
                  <path d="M10 17s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" stroke="currentColor" stroke-width="1.4" />
                  <circle cx="10" cy="7" r="2" stroke="currentColor" stroke-width="1.4" />
                </svg>
                Guarabira · Paraíba
              </span>
              <span class="inline-flex items-center gap-2">
                <svg aria-hidden="true" class="h-4 w-4 text-plum" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4" />
                  <path d="M10 6v4l2.5 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                </svg>
                Atendimento com hora marcada
              </span>
            </div>
          </div>

          <div class="hero-portrait-wrap relative mx-auto w-full max-w-[500px] reveal reveal-delay-2 md:min-h-0">
            <div class="hero-backdrop" aria-hidden="true"></div>
            <div class="hero-photo-frame">
              <img
                class="hero-photo"
                src="/images/fernanda.png"
                alt="Fernanda Dias, maquiadora, em seu retrato profissional"
                fetchpriority="high"
              />
            </div>
            <div class="hero-note">
              <svg class="hero-note-star" aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M12 2.5 14.4 9.6 21.5 12l-7.1 2.4L12 21.5l-2.4-7.1L2.5 12l7.1-2.4L12 2.5Z" fill="currentColor" />
              </svg>
              <p>
                <span>Quero que você se olhe no espelho</span>
                <span>e se sinta <strong>ma-ra-vi-lho-sa!</strong></span>
              </p>
            </div>
          </div>
        </div>
        <div class="hero-bottom" aria-hidden="true"></div>
      </section>

      <section class="intro-section px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div class="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div class="reveal">
            <p class="eyebrow mb-5"><span class="eyebrow-line"></span> Beleza que acolhe</p>
            <h2 class="section-title max-w-lg">Uma maquiagem que tem a sua cara.</h2>
          </div>
          <div class="max-w-2xl reveal reveal-delay-1">
            <p class="text-lg leading-8 text-ink/75">
              Trabalho com produtos de alta performance e técnicas atuais para realçar sua beleza e ajudar a manter a produção bonita ao longo do dia.
            </p>
            <p class="mt-5 text-lg font-medium leading-8 text-ink">
              Cada atendimento começa com uma conversa: quero entender suas preferências e necessidades para que você se sinta confortável do início ao fim.
            </p>
            <div class="mt-8 flex flex-wrap gap-2">
              <span class="tag">Madrinhas</span>
              <span class="tag">Debutantes</span>
              <span class="tag">Formandas</span>
              <span class="tag">Eventos sociais</span>
              <span class="tag">Noivas</span>
              <span class="tag">Editorial e fotos</span>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" class="service-section px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div class="mx-auto max-w-7xl">
          <div class="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-start md:justify-between reveal">
            <div class="max-w-2xl">
              <p class="eyebrow mb-5"><span class="eyebrow-line"></span> Escolha a sua produção</p>
              <h2 class="section-title">Um look para cada momento.</h2>
            </div>
            <p class="max-w-md leading-7 text-ink/65">
              Do visual leve à produção de longa duração, cada maquiagem é pensada para a ocasião e para você.
            </p>
          </div>

          <div
            class="service-carousel"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Opções de maquiagem"
            @touchstart.passive="handleTouchStart"
            @touchend.passive="handleTouchEnd"
          >
            <div
              class="service-track"
              :style="{ '--slide-offset': `${(activeServiceIndex * 100) / services.length}%` }"
            >
              <article
                v-for="(service, index) in services"
                :key="service.name"
                class="service-card service-slide group reveal"
                :class="{
                  'reveal-delay-1': index === 0,
                  'reveal-delay-2': index === 1,
                  'reveal-delay-3': index === 2,
                }"
                role="group"
                aria-roledescription="slide"
                :aria-label="`${service.name}, opção ${index + 1} de ${services.length}`"
              >
              <div class="service-image-wrap">
                <img
                  class="service-image"
                  :src="service.image"
                  :alt="service.imageAlt"
                  loading="lazy"
                />
                <span class="service-index">0{{ index + 1 }}</span>
              </div>
              <div class="flex h-full flex-col p-6 sm:p-7">
                <div class="flex items-start justify-between gap-3">
                  <h3 class="font-display text-3xl font-semibold leading-tight text-ink">{{ service.name }}</h3>
                  <span class="shrink-0 rounded-full bg-lavender px-3 py-1.5 text-xs font-semibold tracking-wide text-plum">
                    {{ service.name === 'À prova d’água' ? 'LONGA DURAÇÃO' : 'MAKEUP' }}
                  </span>
                </div>
                <p class="mt-4 leading-7 text-ink/70">{{ service.description }}</p>
                <ul class="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm text-ink/70">
                  <li v-for="item in service.includes" :key="item" class="flex items-center gap-2.5">
                    <span class="include-dot" aria-hidden="true"></span>
                    {{ item }}
                  </li>
                </ul>
                <div class="mt-auto flex items-end justify-between gap-4 pt-7">
                  <div>
                    <span class="block text-xs uppercase tracking-[0.16em] text-ink/50">Valor</span>
                    <span class="font-display text-3xl font-semibold text-plum">{{ service.price }}</span>
                  </div>
                  <a
                    class="text-sm font-semibold text-plum underline decoration-plum/30 underline-offset-4 transition hover:decoration-plum"
                    :href="`${whatsappUrl}%20Tenho%20interesse%20em%20${encodeURIComponent(service.name)}.`"
                    target="_blank"
                    rel="noreferrer"
                    :aria-label="`Agendar ${service.name} pelo WhatsApp`"
                  >
                    Quero esse
                  </a>
                </div>
              </div>
              </article>
            </div>
          </div>
          <div class="carousel-controls">
            <button
              class="carousel-arrow"
              type="button"
              aria-label="Ver opção anterior"
              @click="showService(activeServiceIndex - 1)"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5m7 7-7-7 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div class="carousel-pagination" role="group" aria-label="Escolher opção de maquiagem">
              <button
                v-for="(service, index) in services"
                :key="service.name"
                class="carousel-dot"
                :class="{ 'carousel-dot-active': activeServiceIndex === index }"
                type="button"
                :aria-label="`Mostrar ${service.name}`"
                :aria-pressed="activeServiceIndex === index"
                @click="showService(index)"
              ></button>
            </div>
            <span class="carousel-position" aria-live="polite" aria-atomic="true">
              0{{ activeServiceIndex + 1 }} <span aria-hidden="true">/</span> 0{{ services.length }}
            </span>
            <button
              class="carousel-arrow"
              type="button"
              aria-label="Ver próxima opção"
              @click="showService(activeServiceIndex + 1)"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <p class="sr-only" aria-live="polite" aria-atomic="true">
            {{ services[activeServiceIndex].name }}, opção {{ activeServiceIndex + 1 }} de {{ services.length }}
          </p>

          <div class="bridal-note mt-6 flex flex-col gap-5 rounded-3xl bg-plum p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-7 reveal">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Para noivas</p>
              <h3 class="mt-2 font-display text-3xl font-semibold">Também há maquiagem blindada.</h3>
              <p class="mt-2 max-w-2xl leading-7 text-white/75">Consulte pelo WhatsApp os detalhes e a disponibilidade para o seu dia.</p>
            </div>
            <a class="button button-light shrink-0" :href="whatsappUrl" target="_blank" rel="noreferrer">
              Consultar
              <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                <path d="M4.2 10h11.6m-4.7-4.7 4.7 4.7-4.7 4.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <p class="mt-5 text-sm leading-6 text-ink/55">
            Os valores informados não são parcelados no cartão. O sinal de R$ 35,00 é descontado do total do serviço.
          </p>
        </div>
      </section>

      <section id="atendimento" class="location-section relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div class="location-decoration" aria-hidden="true"></div>
        <div class="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.85fr] md:items-start md:gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div class="max-w-2xl reveal">
            <p class="eyebrow mb-5"><span class="eyebrow-line"></span> Onde nos encontramos</p>
            <h2 class="section-title">Seu momento começa por aqui.</h2>
            <p class="mt-6 max-w-xl text-lg leading-8 text-ink/70">
              Atendimento presencial no endereço abaixo. Também posso atender em domicílio; nesse caso, combinamos uma taxa de deslocamento.
            </p>
            <a class="button mt-8" :href="whatsappUrl" target="_blank" rel="noreferrer">Falar sobre meu atendimento</a>
          </div>

          <div class="address-card reveal reveal-delay-1">
            <div class="address-icon" aria-hidden="true">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" stroke-width="1.5" />
                <circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Local de atendimento</p>
            <address class="mt-4 not-italic">
              <span class="block font-display text-3xl font-semibold leading-tight text-ink">Avenida Paraguai, 65</span>
              <span class="mt-2 block text-base text-ink/70">1º andar · Nações<br />Guarabira · PB</span>
            </address>
            <div class="mt-6 border-t border-ink/10 pt-5 text-sm leading-6 text-ink/65">
              Atendimento também em domicílio, mediante taxa de deslocamento combinada.
            </div>
          </div>
        </div>
      </section>

      <section class="payment-section px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div class="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="reveal">
            <p class="eyebrow mb-5"><span class="eyebrow-line"></span> Tudo combinado com carinho</p>
            <h2 class="section-title">Pagamento &amp; reserva.</h2>
            <p class="mt-5 max-w-lg leading-7 text-ink/65">
              Para reservar seu horário, peço um sinal que confirma a data e o compromisso de ambas as partes.
            </p>
            <div class="deposit-card mt-8">
              <span class="deposit-label">Sinal para agendamento</span>
              <span class="deposit-price">R$ 35,00</span>
              <p class="mt-2 text-sm leading-6 text-white/75">O valor é descontado do total do serviço.</p>
            </div>
          </div>

          <div class="payment-details reveal reveal-delay-1">
            <h3 class="font-display text-3xl font-semibold text-ink">Formas de pagamento</h3>
            <ul class="mt-6 grid gap-3 sm:grid-cols-2">
              <li class="payment-option"><span class="payment-check">✓</span> PIX</li>
              <li class="payment-option"><span class="payment-check">✓</span> Cartão de crédito, sem juros</li>
              <li class="payment-option"><span class="payment-check">✓</span> Cartão de débito, sem juros</li>
              <li class="payment-option"><span class="payment-check">✓</span> Dinheiro, preferencialmente trocado</li>
            </ul>
            <div class="notice-box mt-8">
              <h4 class="font-semibold text-ink">Importante sobre o sinal</h4>
              <p class="mt-2 text-sm leading-6 text-ink/70">
                O sinal de R$ 35,00 garante a reserva da hora e da data. Em caso de desistência, o valor não será devolvido. Ele é descontado do valor total do serviço contratado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" class="contact-section relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div class="contact-decoration" aria-hidden="true"></div>
        <div class="relative mx-auto grid max-w-7xl items-start gap-10 md:grid-cols-[1fr_0.8fr] md:gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div class="max-w-2xl reveal">
            <p class="eyebrow eyebrow-light mb-5"><span class="eyebrow-line"></span> Vai ser um prazer</p>
            <h2 class="font-display text-5xl font-medium leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-5xl lg:text-7xl">
              Vamos marcar seu momento?
            </h2>
            <p class="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Me conte sobre a ocasião e o visual que você tem em mente. Estou ansiosa para fecharmos um horário na agenda!
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <a class="button button-light" :href="whatsappUrl" target="_blank" rel="noreferrer">
                Chamar no WhatsApp
                <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                  <path d="M4.2 10h11.6m-4.7-4.7 4.7 4.7-4.7 4.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
              <a
                class="button button-glass"
                href="https://www.instagram.com/fernanda.dias.makeup/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
                <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" stroke-width="1.4" />
                  <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.4" />
                  <circle cx="14.5" cy="5.6" r=".8" fill="currentColor" />
                </svg>
              </a>
            </div>
            <div class="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
              <a class="contact-detail" href="tel:+5583986515567">(83) 98651-5567</a>
              <a class="contact-detail" href="https://www.instagram.com/fernanda.dias.makeup/" target="_blank" rel="noreferrer">@fernanda.dias.makeup</a>
            </div>
          </div>
          <div class="contact-portrait-wrap mx-auto w-full max-w-[380px] reveal reveal-delay-2">
            <div class="contact-portrait-ring">
              <img src="/images/portrait-blue.png" alt="Cliente com maquiagem para uma ocasião especial" loading="lazy" />
            </div>
            <p class="mt-6 text-center font-display text-2xl italic text-white/85">Desde já, obrigada pela preferência.</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-white px-5 py-7 sm:px-8 lg:px-12">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <a class="brand-mark brand-mark-footer" href="#inicio" aria-label="Voltar ao início">
          <img class="brand-logo" src="/images/brand-logo.png" alt="" />
        </a>
        <p class="text-xs text-ink/55">Maquiagem com cuidado, em Guarabira · PB</p>
        <a class="text-xs font-semibold text-plum underline decoration-plum/30 underline-offset-4 hover:decoration-plum" href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  </div>
</template>
