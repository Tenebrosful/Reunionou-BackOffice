<template>
    <nav class="navbar">
        <div id="navbar-logo">
            <router-link to="/"><img src="assets/logo.png" alt="Reunionou"></router-link>
        </div>
        <div id="navbar-content">
            <ul>
                <li id="utilisateurs">
                    <router-link to='/utilisateurs'>Utilisateurs</router-link>
                </li>
                <li id="evenements">
                    <router-link to="/evenements">Événements</router-link>
                </li>
            </ul>
        </div>
        <div id="navbar-compte">
            <div v-if="connected == false">
                <router-link to="/connexion"><img src="assets/compte.png" alt="Connexion"></router-link>
            </div>
            <div v-else>
                <router-link to="/"><img src="assets/logout.png" alt="Deconnexion" v-on:click="deconnexion()"></router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
           admin : this.$store.state.admin,
           connected : this.$store.state.connected
        }
    },
    methods: {
       /**
         * Se déconnecter, modification des valeurs token et connected
         * @param : vide
         */
       deconnexion(){
           this.$store.commit("setToken", "");
           this.$store.commit("setAdmin", "");
           this.$store.commit("setConnected", false);
       }
    },
}
</script>

<style lang="scss">
.navbar{
    width: 100%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    background-color: rgba(0,0,0,0.85);
    font-family: system-ui;
    font-size: 1.2vw;
    font-weight: bold;
    top: 0;
    position: absolute; 
    margin-left: -8px;
}

#navbar-logo{
    display: flex;
    justify-content: center;
    align-items: center;
}

#navbar-logo img{
    margin: 10px 0 10px 10px;
    width: 5vw;
}

#navbar-content{
    margin: auto;
}

#navbar-content ul {
    list-style: none;
    display: grid;
    grid-template-columns: 0.2fr 0.2fr;
}

#navbar-content ul li a:hover{
    background-color: rgba(orange, 0.6);
    padding: 30px 80px;
}

#navbar-content ul li a{
    text-decoration: none;
    color: white;
    padding: 30px 80px;
}

#navbar-compte{
    margin: auto;
}

#navbar-compte img{
    margin: 10px 10px;
    width: 4vw;
}

</style>
