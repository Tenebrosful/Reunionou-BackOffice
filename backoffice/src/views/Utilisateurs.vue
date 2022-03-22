<template>
  <section>
    <Header />
      <div class="cards">
        <div class="card" v-for="utilisateur in utilisateurs">
          <div class="card-inner">
            <div class="card-content">
              <h1>{{utilisateur.name}}</h1>
              <p>{{utilisateur.username}}</p>
              <p>{{utilisateur.email}}</p>
              <div class="buttons">
                <router-link :to="{ name: 'UtilisateurEvenements', params :{id: utilisateur.id}}"><button type="submit" class="sesevemenents">Ses événements</button></router-link>
                <button type="submit" class="supprimer">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
  </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Utilisateurs',
    data() {
        return {
          utilisateurs: ""
        }
    },
    methods: {
    },
    created(){
         axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                this.utilisateurs = response.data;
                console.log(this.utilisateurs);
            })
            .catch(error => {
                console.log(error);
            });
    }

}
</script>
<style lang="scss">
body{
  font-family: system-ui;
}

.cards{
  padding-top: 140px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 50px;
  padding-bottom: 50px;
}

.card {
  background-color: rgba(0,0,0,0.03);
  width: 80%;
  height: 250px;
  border: 10px dotted royalblue;
  perspective: 1000px; 
  margin: auto auto 50px auto;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}


.card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(royalblue, 0.8);
  color: white;
}

.card-content p{
  font-size: 20px;
}
.supprimer{
  color: white;
  font-weight: bold;
  background-color: rgba(red, 0.9);
  border: 1px solid rgba(red, 0.9);
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 15px;
}

.buttons{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.sesevemenents{
  color: white;
  font-weight: bold;
  background-color: orange;
  border: 1px solid orange;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 15px;
  margin-right: 20px;
}

</style>