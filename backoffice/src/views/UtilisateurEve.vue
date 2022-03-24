<template>
  <section>
    <Header />
    <div id="data">
      <h1 class="titre" v-if="selfEvent">
        LISTE DES EVENEMENTS ORGANISÉS PAR "{{ownerEvent.username}}"
      </h1>
      <h1 class="titre" v-if="joinedEvent">
        LES EVENEMENTS PARTICIPÉS PAR "{{ownerEvent.username}}"
      </h1>
      <div id="chemin">
        <div class="dropdown" >
          <button class="dropbtn">Filtrer par</button>
          <div class="dropdown-content">
            <div v-on:click="getSelfEvents()" v-model="selfEvent">Ses événements</div>
            <div v-on:click="getJoinedEvents()" v-model="joinedEvent">Événements participés</div>
          </div>
        </div>
        <div class="message" v-if="selfEvent">
          {{message}}
        </div>
        <div class="message" v-if="joinedEvent">
          {{message}}
        </div>
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
            <p v-on:click="getCommentaires(evenement.id)"><i class="fas fa-comment fa-lg"></i></p>
            <p v-on:click="delEvenement(evenement.id)"><i class="fas fa-trash fa-lg"></i></p>
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
          owner: "",
          ownerEvent: "",
          joinedEvent: false,
          selfEvent: false,
          message: ""
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
                this.ownerEvent = response.data;
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
                this.selfEvent = true;
                this.joinedEvent = false;
                this.evenements = response.data.events;
                this.message = "Ses événements";
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
                this.selfEvent = false;
                this.joinedEvent = true;
                this.message = "Événements participés";
            })
            .catch(error => {
                console.log(error);
            });
       },
       delEvenement(id){
         axios
            .delete("http://docketu.iutnc.univ-lorraine.fr:62460/api/event/" + id)
            .then(response => {
                console.log(response.data);
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
                this.selfEvent = true;
                this.evenements = response.data.events;
                this.message = "Ses événements";
            })
            .catch(error => {
                console.log(error);
            });
      }

}
</script>
<style lang="scss">
#chemin{
  display: flex;
  flex-direction: row;
}

.message{
  margin-top: 65px;
  margin-left: 50px;
  color: gray;
  font-weight: bold;
}

.titre{
  color: royalblue;
  padding-top: 140px;
  font-size: 30px;
  text-align: center;
}

.dropbtn {
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

.dropdown {
  position: relative;
  display: inline-block;
  margin-top: 50px;
  margin-left: 7%;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: lightblue;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  cursor: pointer;
}

.dropdown-content div {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content div:hover {
  background-color: rgba(black, 0.3);
  color: white;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #0096FF;
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