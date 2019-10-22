<template>
    <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input v-model="title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input v-model="description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <!-- <fieldset class="form-group">
                <input v-model="tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset> -->
            <button @click="publish" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
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
            title: "",
            description: "",
            body: ""
            // tagList: []
        };
    },
    methods: {
        publish() {
            this.$store.dispatch("users/publishArticle", {
           title: this.title,
            description: this.description,
            body: this.body
            // tagList: this.tagList.push()
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