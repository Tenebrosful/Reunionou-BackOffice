<template>
  <section>
    <Header />
    <div id="data">
      <div id="listeevenements">
        <div class="unevenement" v-for="evenement in evenements">
          <div class="date">
            <h1>06</h1>
            <h1>JUIN</h1>
          </div>
          <div class="description">
            <h1>Pearl Jam</h1>
            <p><i class="fas fa-map-marker-alt fa-lg"></i>{{evenement.address.street}}</p>
            <p><i class="fas fa-user-crown fa-lg"></i>{{evenement.name}}</p>
            <p><i class="fas fa-male fa-lg"></i>100 participants</p>
          </div>
          <div class="autre">
            <p><i class="fas fa-trash fa-lg"></i></p>
            <p v-on:click="getCommentaires(evenement.id)"><i class="fas fa-comment fa-lg"></i></p>
          </div>
          <div class="commentaires">
            <div v-if="id == evenement.id">
              <div class="scroller"  v-if="afficher">
                <p><strong>{{evenement.name}} : </strong>{{evenement.name}}</p>
                <p><strong>{{evenement.name}} : </strong>{{evenement.name}}</p>
                <p><strong>{{evenement.name}} : </strong>{{evenement.name}}</p>
                <p><strong>{{evenement.name}} : </strong>{{evenement.name}}</p>
                <p><strong>{{evenement.name}} : </strong>{{evenement.name}}</p>
                <p><strong>{{evenement.name}} : </strong>{{evenement.name}}</p>
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
import StackModal from '@innologica/vue-stackable-modal';

export default {
    name: 'Evenements',
    data() {
        return {
          evenements: "",
          comments: "",
          afficher: false,
          id: 0
        }
    },
    methods: {
       getCommentaires(id){
         axios
            .get("https://jsonplaceholder.typicode.com/users/" + id)
            .then(response => {
                this.comments = response.data;
                this.afficher = true;
                this.id = id;
                console.log(this.comments)
            })
            .catch(error => {
                console.log(error);
            });
       }
    },
    created(){
         axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                this.evenements = response.data;
                console.log(this.evenements)
            })
            .catch(error => {
                console.log(error);
            });
    }

}
</script>
<style lang="scss">
.scroller {
  width: 100%;
  height: 180px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.commentaires{
  background-color: slateblue;
  height: 92%;
  width: 78%;
  padding: 10px 50px;
  color: white;

}

body{
  font-family: system-ui;
}

#listeevenements{
  padding-top: 120px;
  padding-bottom: 50px;
}

.unevenement{
  border: 5px solid slateblue;
  display: grid;
  grid-template-columns: 0.4fr 0.6fr 0.2fr 0.8fr;
  grid-column-gap: 50px;
  margin: 20px auto 50px auto;
  width: 70%;
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

.fa-comment{
  color: gray;
  padding: 20px 20px;

}

.autre p:hover{
  background-color: darkgray;
  
}
.fa-trash{
    color: gray;
    padding: 20px 20px;
}
</style>