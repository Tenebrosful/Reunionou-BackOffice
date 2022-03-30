<template>
  <section>
    <Header />
    <div id="connexion">
      <h1>CONNEXION</h1>
      <form>
        <input type="text" id="username" placeholder="Identifiant" v-model="login"/>
        <p></p>
        <input type="password" id="password" placeholder="Mot de passe" v-model="password"/>
        <div id="button">
          <p><button type="submit" id="submit-connexion" v-on:click="connexion()">Se connecter</button></p>
        </div>
      </form>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Connexion',
    data() {
        return {
          admin: "",
          login: "",
          password: ""
        }
    },
    methods: {
      connexion(){
        let data = {
          "login": this.login,
          "password": this.password
        }
        axios
            .post("http://docketu.iutnc.univ-lorraine.fr:62461/api/auth", data)
            .then(response => {
              	this.$store.commit('setToken', response.data.user.token);
                this.$store.commit('setAdmin', response.data.user.username);
                this.$store.commit('setConnected', true);
                this.$router.push('/');
            })
            .catch(error => {
                console.log(error);
            });
      }
    },
}
</script>
<style lang="scss">
#connexion{
  position: absolute;
  top: 25%;
  left: 39%;
  right: 39%;
  border: 5px inset rgba(0,0,0,0);
  border-radius: 15px;
  padding: 10px 40px;
  color: white;
  background-color: rgba(4,4,4,0.5);
}

#connexion p{
  font-weight: bold;
}

input {
  background-color: white;
  border: 1px solid white;
  border-radius: 2px;
  width: 95%;
  font-size: 15px;
  padding: 8px 10px;
  color: black;
}
#connexion h1{
  text-align: center;
  margin-top: 10%;
  margin-bottom: 15%;
}

#submit-connexion{
  color: white;
  background-color: dodgerblue;
  border-radius: 5px;
  border: 3px solid dodgerblue;
  padding: 8px 15px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
}

#button{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10%;
  width: 100%;
}
</style>