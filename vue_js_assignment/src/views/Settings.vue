<template>
    <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input v-model="image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button @click="updateSetting" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import router from '../router';
export default {
    data: function(){
        return {
            image: "",
            username: "",
            bio: "",
            email: "",
            password: ""
        };
    },
    methods: {
        updateSetting() {
           this.$store.dispatch("users/updateSetting", {
           image: this.image,
            username: this.username,
            bio: this.bio,
            email: this.email,
            password: this.password
            })
            .then(() => {
               
            router.push({ name: "home" });
                this.errors=[];
            })
            .catch( err => this.errors.push(err))
        
        }
    }
};
</script>