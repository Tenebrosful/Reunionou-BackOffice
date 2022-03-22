<template>
    <nav class="navbar">
        <div id="navbar-logo">
            <router-link to="/"><img src="assets/logo.png" alt="Reunionou"></router-link>
        </div>
        <div id="navbar-content">
            <ul>
                <li id="utilisateurs">
                        <router-link to="/utilisateurs">Utilisateurs</router-link>
                </li>
                <li id="evenements">
                    <router-link to="/evenements">Événements</router-link>
                </li>
            </ul>
        </div>
        <div id="navbar-compte">
            <router-link to="/connexion"><img src="assets/compte.png" alt="Connexion"></router-link>
        </div>
    </nav>
</template>

<script>
//import axios from 'axios';

export default {
    data() {
        return {
           
        }
    },
    methods: {
       
    },
    /*created(){
         axios
            .get("http://localhost:3000/creneaux/" +  this.momentDate(this.emission_date))
            .then(response => {
                this.emission_data = response.data.filter(emissionsFiltered =>
                                emissionsFiltered.heure <= this.getCurrentTime() && this.getCurrentTime() < this.getTimePlus30Min(emissionsFiltered.heure))[0];
                 console.log(this.emission_data);              
            })
            .catch(error => {
                console.log(error);
            });
    }*/

}
</script>

<style lang="scss">
.navbar{
    width: 100%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    background-color: rgba(0,0,0,0.85);
    font-family: system-ui;
    font-size: 18px;
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
    width: 100px;
}

#navbar-content{
    margin: auto;
}

#navbar-content ul {
    list-style: none;
    display: grid;
    grid-template-columns: 0.2fr 0.2fr;
}

#navbar-content ul li {
    
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
    width: 70px;
}

</style>
