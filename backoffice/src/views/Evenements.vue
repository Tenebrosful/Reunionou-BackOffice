<template>
  <section>
    <Header />
    <h1 class="titre">LISTE DES EVENEMENTS DE TOUS LES UTILISATEURS</h1>
    <div id="data">
      <div id="listeevenements">
        <div class="unevenement" v-for="evenement in evenements" v-bind:key="evenement.id">
          <div class="date">
            <h1>{{jour(evenement.date)}}</h1>
            <h1>{{mois(evenement.date)}}</h1>
          </div>
          <div class="description">
            <h1>{{evenement.title}}</h1>
            <p><i class="fas fa-map-marker-alt fa-lg"></i>{{evenement.coords.address}}</p>
            <p v-if="evenement.owner"><i class="fas fa-user-crown fa-lg"></i>{{evenement.owner.username}}</p>
            <p><i class="fas fa-male fa-lg"></i>{{evenement.comingParticipant}} participant(s)</p>
            <p>{{evenement.description}}</p>
          </div>
          <div class="autre">
            <p v-on:click="getCommentaires(evenement.id)"><i class="fas fa-comment fa-lg"></i></p>
            <p v-on:click="delEvenement(evenement.id)"><i class="fas fa-trash fa-lg"></i></p>
          </div>
          <div class="commentaires">
            <div class="scroller" v-if="afficher">
              <div v-for="commentaire in commentaires" v-bind:key="commentaire.id">
                <div v-if="evenement.id == commentaire.event_id">
                    <p><strong>{{commentaire.author.username}} : </strong>{{commentaire.message}}</p>
                </div>
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
import moment from "moment";

export default {
    name: 'Evenements',
    data() {
        return {
          evenements: "",
          afficher: false,
          commentaires: ""
        }
    },
    methods: {
      /**
         * Afficher un jour
         * @param : date
         * @return : jour avec un format 'DD'
         */
        jour(value) {
            moment.locale('fr');
            return moment(String(value)).format('DD');
        },

        /**
         * Afficher un mois
         * @param : date
         * @return : mois avec un format 'MMMM'
         */
        mois(value) {
            moment.locale('fr');
            return moment(String(value)).format('MMMM');
        },

        /**
         * Récupérer tous les événements organisés par un utilisateur
         * @param : id d'un événement
         */
        getCommentaires(id){
          axios
              .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/event/" + id + '/comments?embedAuthor=true', {
                  headers: {
                    authorization: this.$store.state.token 
                  }
                })
              .then(response => {
                  this.commentaires = response.data.comments;
                  this.afficher = true;
              })
              .catch(error => {
                  console.log(error);
              });
        },

       /**
         * Récupérer tous les événements de tous les utilisateur
         * @param : vide
         */
        getAllEvents(){
          axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/event?embedOwner=true&participants=true", 
            {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                this.evenements = response.data.events;
            })
            .catch(error => {
                console.log(error);
            });
        },

       /**
         * Supprimer un événement
         * @param : id d'un événement
         */
        delEvenement(id){
          axios
              .delete("http://docketu.iutnc.univ-lorraine.fr:62461/api/event/" + id, {
                  headers: {
                    authorization: this.$store.state.token 
                  }
                })
              .then(response => {
                  this.getAllEvents();
              })
              .catch(error => {
                  console.log(error);
              });
        },
    },

    /**
     * Récupérer tous les événements de tous les utilisateur
     * @param : vide
     */
    created(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62461/api/event?embedOwner=true&participants=true", 
            {
                headers: {
                  authorization: this.$store.state.token 
                }
              })
            .then(response => {
                this.evenements = response.data.events;
            })
            .catch(error => {
                console.log(error);
            });
      }

}
</script>
<style lang="scss">
.titre{
  color: royalblue;
  padding-top: 140px;
  font-size: 2vw;
  text-align: center;
}

.scroller {
  width: 100%;
  height: 225px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.commentaires{
  background-color: slateblue;
  color: white;
  padding: 10px 20px;
  text-align: justify;
}

#listeevenements{
  padding-top: 60px;
  padding-bottom: 50px;
}

.unevenement{
  border: 5px solid slateblue;
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.1fr 0.6fr;
  grid-column-gap: 50px;
  margin: 20px auto 50px auto;
  width: 85%;
  font-size: 1vw;
  font-weight: none;

}
.fa-user-crown{
  color: gray;
  margin-right: 20px;
}

.fa-map-marker-alt{
  color: gray;
  margin-left: 2px;
  margin-right: 22px;
}

.fa-male{
  color: gray;
  margin-left: 5px;
  margin-right: 25px;
}

.description p:nth-of-type(4){
  text-align: justify;
}

.date{
  background-color: slateblue;
  font-size: 2vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.date h1:nth-of-type(1){
  margin-bottom: -10px;
}

.description{
  margin: auto 0 auto 0;
}

.autre{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.autre p .fa-comment{
  color: blue;
  padding: 20px 20px 20px 20px;
  background-color: rgba(black, 0.4);
}

.autre p .fa-comment:hover{
  background-color: rgba(slateblue, 0.4);
}
.autre p .fa-trash{
  color: #D22B2B;
  padding: 20px 20px 20px 20px;
  background-color: rgba(black, 0.4);
}

.autre p .fa-trash:hover{
  background-color: rgba(slateblue, 0.4);
}
</style>