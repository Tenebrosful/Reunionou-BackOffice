<template>
  <section id="accueil">
    <Header />
    <div id="logo">
    <img src="assets/logo.png" alt="Reunionou">
    </div>
    <div id="accueil-titre">
        <h1>Bienvenue au Reunionou BackOffice !</h1>
    </div>
    <Footer />
  </section>
</template>

<script>
export default {
    name: 'Accueil',
    data() {
        return {
        }
    },
    methods: {
       
    },
}
</script>
<style lang="scss">
#accueil-titre{
    position: absolute;
    top: 26vw;
    border: 5px solid orange;
    left: 30%;
    right: 30%;
    background-color: rgba(black, 0.05);

}
#accueil h1{
    text-align: center;
    color: #00AB8E;
    font-size: 1.8vw;
}

img{
    width: 22vw;
}

#logo{
    position: absolute;
    top: 11.5vw;
    left: 39%;
    right: 39%;
}
</style>