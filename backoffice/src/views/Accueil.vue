<template>
  <section id="accueil">
    <Header />
    <div id="logo">
    <img src="../assets/logo.png" alt="Reunionou">
    </div>
    <div id="titre">
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
body{
    font-family: system-ui;
}
#titre{
    position: absolute;
    top: 60%;
    transform: translate(0, -50%);
    border: 5px solid orange;
    padding: 10px;
    left: 30%;
    right: 30%;
    background-color: rgba(black, 0.05);
}
#accueil h1{
    text-align:center;
    color: #00AB8E;
    font-size: 35px;
}

img{
    width: 400px;
}

#logo{
    position: absolute;
    top: 20%;
    left: 39%;
    right: 39%;
}
</style>