<template>
  <section>
    <Header />
    <div id="data">
      <div id="event-buttons">
        <button type="submit" v-on:click="getSelfEvents()">Ses événements</button>
        <button type="submit" v-on:click="getJoinedEvents()">Participation aux événements</button>
      </div>
      <div id="listeevenement">
        <div class="unevenement" v-for="evenement in evenements">
          <div class="date">
            <h1>{{jour(evenement.date)}}</h1>
            <h1>{{mois(evenement.date)}}</h1>
          </div>
          <div class="description">
            <h1>{{evenement.title}}</h1>
            <p><i class="fas fa-map-marker-alt fa-lg"></i>{{evenement.coords.address}}</p>
            <div v-if="owner != null">
              <p><i class="fas fa-user-crown fa-lg"></i>{{owner.username}}</p>
            </div>
            <div v-else>
              <p><i class="fas fa-user-crown fa-lg"></i>{{evenement.owner.username}}</p>
            </div>
            <p><i class="fas fa-male fa-lg"></i>{{evenement.comingParticipant}} participant(s)</p>
            <p>{{evenement.description}}</p>
          </div>
          <div class="autre">
            <p><i class="fas fa-trash fa-lg"></i></p>
            <p><i class="fas fa-comment fa-lg" v-on:click="getCommentaires(evenement.id)"></i></p>
          </div>
          <div class="commentaires">
            <div class="scroller" v-if="afficher">
              <div v-for="commentaire in commentaires">
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
          commentaires: "",
          afficher: false,
          id: this.$route.params.id,
          owner: ""
        }
    },
    methods: {
        jour(value) {
            moment.locale('fr');
            return moment(String(value)).format('DD');
        },
        mois(value) {
            moment.locale('fr');
            return moment(String(value)).format('MMMM');
        },
        getCommentaires(id){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62460/api/event/" + id + '/comments?embedAuthor=true')
            .then(response => {
                this.commentaires = response.data.comments;
                this.afficher = true;
            })
            .catch(error => {
                console.log(error);
            });
       },
       getOwner(id){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62460/api/user/" + id)
            .then(response => {
                this.owner = response.data;
            })
            .catch(error => {
                console.log(error);
            });
       },
       getSelfEvents(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62460/api/user/" + this.id + '/self-event?participants=true')
            .then(response => {
                this.getOwner(this.id);
                this.evenements = response.data.events;
            })
            .catch(error => {
                console.log(error);
            });
       },
       getJoinedEvents(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62460/api/user/" + this.id + '/joined-event?participants=true&embedOwner=true')
            .then(response => {
                this.owner = null;
                this.evenements = response.data.events;
            })
            .catch(error => {
                console.log(error);
            });
       }
      
    },
    created(){
         axios
            .get("http://docketu.iutnc.univ-lorraine.fr:62460/api/user/" + this.id + '/self-event?participants=true')
            .then(response => {
                this.getOwner(this.id);
                this.evenements = response.data.events;
            })
            .catch(error => {
                console.log(error);
            });
    }

}
</script>
<style lang="scss">
#event-buttons{
  padding-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#event-buttons button{
  background-color: darkslateblue;
  border: 1px solid darkslateblue;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  padding: 15px 30px;
  font-size: 20px;
}

#event-buttons button:hover{
  background-color: slateblue;
}

#event-buttons button:nth-of-type(1){
  margin-right: 50px;
}

.scroller {
  width: 100%;
  height: 180px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.commentaires{
  background-color: slateblue;
  color: white;
  padding: 10px 20px;
}

#listeevenement{
  padding-top: 40px;
  padding-bottom: 50px;
}

.unevenement{
  border: 5px solid slateblue;
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.1fr 0.6fr;
  grid-column-gap: 50px;
  margin: 20px auto 50px auto;
  width: 85%;
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
  font-size: 30px;
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

.autre .fa-comment{
  color: gray;
  padding: 20px 5px 20px 20px;
}

.autre p:hover{
  background-color: darkgray;
  
}
.autre .fa-trash{
    color: gray;
    padding: 20px 5px 20px 20px;
}
</style>