<template>
  <section>
    <Header />
      <h1 class="titre">LISTE DES UTILISATEURS</h1>
      <div id="chemin1">
        <div class="dropdown1" >
          <button class="dropbtn1">Filtrer par</button>
          <div class="dropdown-content1">
            <div v-on:click="getAdmins()">Administrateurs</div>
            <div v-on:click="getUtilisateursActives()">Utilisateurs Actives</div>
            <div v-on:click="getUtilisateursInactives()">Utilisateurs Inactives</div>
          </div>
        </div>
        <div class="message1" v-if="admins">
          {{message}}
        </div>
        <div class="message1" v-if="userActive">
          {{message}}
        </div>
        <div class="message1" v-if="userInactive">
          {{message}}
        </div>
      </div>
       <div v-if="userInactive" id="btn-supprimer">
        <button type="submit" id="supprimer" v-on:click="delUtilisateurInactive()">Supprimer</button>
        <p id="info">Supprimer tous les utilisateurs inactives</p>
      </div>
      <div class="cards">
        <div class="card" v-for="utilisateur in utilisateurs" v-bind:key="utilisateur.id">
          <div class="card-inner">
            <div class="card-content">
            <div class="card-info">
                <h1>{{utilisateur.login}}</h1>
                <div v-for="user in users" v-bind:key="user.id">
                  <div v-if="user.id == utilisateur.id">
                    <p><i class="fas fa-user-alt"></i> {{user.username}}</p>
                  </div>
                </div>
                <p v-if="utilisateur.isAdmin == 1"><i class="fas fa-user-tag"></i>Admin</p>
                <p v-else><i class="fas fa-user-tag"></i>Utilisateur</p>
                <div v-for="user in users" v-bind:key="user.id">
                  <div v-if="user.id == utilisateur.id">
                    <p v-if="user.default_event_mail != null">
                      <i class="fas fa-envelope"></i> {{user.default_event_mail}}
                    </p>
                    <p v-else>
                      <i class="fas fa-envelope"></i> -
                    </p>
                  </div>
                </div>
                <p>Date de création :</p>
                <p>{{formatdate(utilisateur.createdAt) + " à " + time(utilisateur.createdAt).substr(0,2) + "h" + time(utilisateur.createdAt).substr(3,2)}}</p>
                <p>Dérnière connexion :</p>
                <p>Il y a {{countDays(utilisateur.last_connexion)}} jours</p>
              </div>
              <div v-if="userActive">
                <div class="buttons">
                  <router-link :to="{ name: 'UtilisateurEvenements', params :{id: utilisateur.id}}"><i class="fad fa-calendar-star fa-lg"></i></router-link>
                    <i class="fas fa-trash fa-lg" v-on:click="delUtilisateurActive(utilisateur.id)"></i>
                  </div>
                </div>
                <div v-else>
                <div class="buttons">
                  <router-link :to="{ name: 'UtilisateurEvenements', params :{id: utilisateur.id}}"><i class="fad fa-calendar-star fa-lg"></i></router-link>
                  </div>
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
          id: "",
          users: "",
          message: "",
          userActive: false,
          userInactive: false,
          admins: true
        }
    },
    methods: {
      formatdate(value) {
            if (value) {
                moment.locale('fr');
                return moment(String(value)).format('DD MMMM YYYY');
            }
        },
      date(value) {
            if (value) {
                moment.locale('fr');
                return moment(String(value)).format('DD-MM-YYYY');
            } else {
                moment.locale('fr');
                return moment().format('DD-MM-YYYY');
            }
        },
      countDays(value){
        var date = moment([this.date(value).substr(6,4), this.date(value).substr(3,2), this.date(value).substr(0,2)]);
        var now = moment([this.date().substr(6,4), this.date().substr(3,2), this.date().substr(0,2)]);
        return now.diff(date, 'days') ;
      },
      time(value){
          const today = new Date(value);
          return today.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second: '2-digit'});
      },
      delUtilisateurActive(id){
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
       delUtilisateurInactive(){
         axios
            .delete("http://docketu.iutnc.univ-lorraine.fr:62461/api/user?forceDelete=true", {
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
       getUtilisateurs(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/user/", {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                this.users = response.data.users;
            })
            .catch(error => {
                console.log(error);
            });
       },
       getUtilisateursActives(){
          axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/user/account",
            {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                this.utilisateurs = response.data.userAccounts.filter(users => users.isAdmin == false);
                this.getUtilisateurs();
                this.userActive = true;
                this.admins = false;
                this.userInactive = false;
                this.message = "Utilisateurs Actives";
            })
            .catch(error => {
                console.log(error);
            });
       },
       getUtilisateursInactives(){
          axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/user/account",
            {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                var now1 = moment([this.date().substr(6,4), this.date().substr(3,2), this.date().substr(0,2)]);
                
                this.utilisateurs = response.data.userAccounts.filter(users => (users.isAdmin == false &&  now1.diff(moment([this.date(users.last_connexion).substr(6,4), this.date(users.last_connexion).substr(3,2), this.date(users.last_connexion).substr(0,2)]), 'days') > 30));
                this.getUtilisateurs();
                this.userInscrit = false;
                this.userActive = false;
                this.admins = false;
                this.userInactive = true;
                this.message = "Utilisateurs Non Actives";
            })
            .catch(error => {
                console.log(error);
            });
       },
       getAdmins(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/user/account",
            {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                 this.utilisateurs = response.data.userAccounts.filter(users => users.isAdmin == true);
                 this.getUtilisateurs();
                 this.admins = true;
                 this.message = "Administrateurs";
                 this.userInactive = false;
                 this.userInscrit = false;
                 this.userActive = false;
            })
            .catch(error => {
                console.log(error);
            });
       }

    },
    created(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/user/account",
            {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                 this.utilisateurs = response.data.userAccounts.filter(users => users.isAdmin == true);
                 this.getUtilisateurs();
                 this.admins = true;
                 this.userInactive = false;
                 this.userInscrit = false;
                 this.userActive = false;
                 this.message = "Administrateurs";
            })
            .catch(error => {
                console.log(error);
            });
    },
}
</script>
<style lang="scss">
#chemin1{
  display: flex;
  flex-direction: row;
}
#btn-supprimer{
  color: gray;
  font-weight: bold;
  margin-right: -3%;
}
#btn-supprimer #info{
  margin-top: -34px;
  color: gray;
  font-weight: bold;
  margin-left: 65%;
  margin-right: 18%;
}
#btn-supprimer #supprimer{
  background-color: rgba(red, 0.8);
  border: 1px solid rgba(red, 0.8);
  border-radius: 5px;
  color: white;
  font-size: 16px;
  padding: 15px 50px;
  font-weight: bold;
  margin-left: 85%;
}

.message1{
  margin-top: 65px;
  margin-left: 50px;
  color: gray;
  font-weight: bold;
}

.dropbtn1 {
  background-color: #0096FF;
  color: white;
  padding: 15px 50px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #0096FF;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
}

.dropdown1 {
  position: relative;
  display: inline-block;
  margin-top: 50px;
  margin-left: 2%;
}

.dropdown-content1 {
  display: none;
  position: absolute;
  background-color: lightblue;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  cursor: pointer;
}

.dropdown-content1 div {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content1 div:hover {
  background-color: rgba(black, 0.3);
  color: white;
}

.dropdown1:hover .dropdown-content1 {
  display: block;
}

.dropdown1:hover .dropbtn1 {
  background-color: #0096FF;
}

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
  height: 390px;
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

.card-info p:nth-of-type(2){
  font-weight: bold;
}

.card-info p:nth-of-type(4){
  font-weight: bold;
}

.card-content p:nth-of-type(2){
  color: rgba(black, 0.4);
}

.card-content p:nth-of-type(5){
  margin-left: 20px;
}

.card-content p:nth-of-type(4){
  color: rgba(black, 0.4);
}

.card-content p:nth-of-type(3){
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

.fa-user-tag{
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