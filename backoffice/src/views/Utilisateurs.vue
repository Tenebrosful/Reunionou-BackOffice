<template>
  <section>
    <Header />
      <div class="cards">
        <div class="card" v-for="utilisateur in utilisateurs">
          <div class="card-inner">
            <div class="card-content">
            <div class="card-info">
              <h1>{{utilisateur.username}}</h1>
              <p><i class="fas fa-user-alt"></i> {{utilisateur.username}}</p>
              <p><i class="fas fa-envelope"></i> {{utilisateur.default_event_mail}}</p>
              <p><i class="fad fa-calendar-plus"></i> {{date(utilisateur.createdAt) + " à " + time(utilisateur.createdAt)}}</p>
              <p><i class="fad fa-calendar"></i></i> {{date(utilisateur.last_connexion) + " à " + time(utilisateur.last_connexion)}}</p>
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
            .delete("http://docketu.iutnc.univ-lorraine.fr:62460/api/user/" + id)
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
            .get("http://docketu.iutnc.univ-lorraine.fr:62460/api/user")
            .then(response => {
                this.utilisateurs = response.data.users;
            })
            .catch(error => {
                console.log(error);
            });
    }

}
</script>
<style lang="scss">
.cards{
  padding-top: 140px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 50px;
  padding-bottom: 50px;
}

.card {
  width: 90%;
  height: 270px;
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
  width: 90%;
  height: 96%;
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

.card-content p:nth-of-type(4){
  color: rgba(black, 0.4);
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
}

.buttons .fa-calendar-star:hover{
  background-color: rgba(black, 0.4);
}

.buttons .fa-trash{
  color: darkred;
  cursor: pointer;
  padding: 10px 10px;
}

.buttons .fa-trash:hover{
  background-color: rgba(black, 0.4);
   height: fit-content;
}

.fa-user-alt{
  color: rgba(black, 0.4);
}

.fa-envelope{
  color: rgba(black, 0.4);
}

.fa-calendar-plus{
  color: lightgreen;
}

.fa-calendar{
  color: rgba(black, 0.4);
}

p i{
  margin-right: 20px;
}

</style>