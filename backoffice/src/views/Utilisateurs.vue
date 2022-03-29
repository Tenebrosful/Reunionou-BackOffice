<template>
  <section>
    <Header />
      <h1 class="titre">LISTE DES UTILISATEURS</h1>
      <div class="cards">
        <div class="card" v-for="utilisateur in utilisateurs" v-bind:key="utilisateur.id">
          <div class="card-inner">
            <div class="card-content">
            <div class="card-info">
              <h1>{{utilisateur.username}}</h1>
              <p><i class="fas fa-user-alt"></i> {{utilisateur.username}}</p>
              <p v-if="utilisateur.default_event_mail != null">
                <i class="fas fa-envelope"></i> {{utilisateur.default_event_mail}}
              </p>
              <p v-else>
                <i class="fas fa-envelope"></i> -
              </p>
              <p>Date de création :</p>
              <p>{{date(utilisateur.createdAt) + " à " + time(utilisateur.createdAt).substr(0,2) + "h" + time(utilisateur.createdAt).substr(3,2)}}</p>
              <p>Dérnière connexion :</p>
              <p>{{date(utilisateur.last_connexion) + " à " + time(utilisateur.createdAt).substr(0,2) + "h" + time(utilisateur.createdAt).substr(3,2)}}</p>
              </div>
              <div class="buttons">
                <router-link :to="{ name: 'UtilisateurEvenements', params :{id: utilisateur.id}}"><i class="fad fa-calendar-star fa-lg"></i></router-link>
                <i class="fas fa-trash fa-lg" v-on:click="delUtilisateur(utilisateur.id)"></i>
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
import moment from 'moment';

export default {
    name: 'Utilisateurs',
    data() {
        return {
          utilisateurs: "",
          id: ""
        }
    },
    methods: {
      date(value) {
            if (value) {
                moment.locale('fr');
                return moment(String(value)).format('DD MMMM YYYY');
            } else {
                moment.locale('fr');
                return moment().format('YYYY-MM-DD');
            }
        },
      time(value){
          const today = new Date(value);
          return today.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second: '2-digit'});
      },
      delUtilisateur(id){
         axios
            .delete("http://docketu.iutnc.univ-lorraine.fr:62461/api/user/" + id, {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
       },
    },
    created(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/user",
            {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                 this.utilisateurs = response.data.users;
            })
            .catch(error => {
                console.log(error);
            });
    },
}
</script>
<style lang="scss">
.cards{
  padding-top: 60px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 50px;
  padding-bottom: 50px;
}

.titre{
  color: royalblue;
  padding-top: 140px;
  font-size: 30px;
  text-align: center;
}

.card {
  width: 90%;
  height: 350px;
  border: 10px dotted royalblue; 
  margin: auto auto 50px auto;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.card-content {
  position: absolute;
  width: 89%;
  height: 97%;
  background-color: rgba(royalblue, 0.8);
  color: white;
  padding: 10px 0 0 50px;
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
}

.card-content h1{
  text-align: center;
  margin-left: 25%;
  margin-bottom: 10%;
}

.card-content p{
  font-size: 18px;
  color: white;
}

.card-info p:nth-of-type(3){
  font-weight: bold;
}

.card-info p:nth-of-type(5){
  font-weight: bold;
}

.card-content p:nth-of-type(3){
  color: rgba(black, 0.4);
}

.card-content p:nth-of-type(4){
  margin-left: 20px;
}

.card-content p:nth-of-type(5){
  color: rgba(black, 0.4);
}

.card-content p:nth-of-type(6){
  margin-left: 20px;
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
  margin-top: 12%;
}

.buttons .fa-calendar-star{
  color: gold;
  margin-right: 30px;
  cursor: pointer;
  padding: 10px 10px;
  background-color: rgba(black, 0.4);
}

.buttons .fa-calendar-star:hover{
  background-color: rgba(white, 0.4);
}

.buttons .fa-trash{
  color: #D22B2B;
  cursor: pointer;
  padding: 10px 10px;
  background-color: rgba(black, 0.4);
  height: fit-content;
}

.buttons .fa-trash:hover{
  background-color: rgba(white, 0.4);
  height: fit-content;
}

.fa-user-alt{
  color: rgba(black, 0.4);
}

.fa-envelope{
  color: rgba(black, 0.4);
}

.fa-calendar-plus{
  color: rgba(black, 0.4);
}

.fa-calendar{
  color: rgba(black, 0.4);
}

p i{
  margin-right: 20px;
}

</style>