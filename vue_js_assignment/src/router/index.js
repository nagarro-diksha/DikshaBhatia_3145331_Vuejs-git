import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Settings from '../views/Settings.vue';
import Article from '../views/Article.vue';
import ArticleCreate from '../views/ArticleCreate.vue';
import ArticleEdit from '../views/ArticleEdit.vue';
import Profile from '../views/Profile.vue'


Vue.use(VueRouter);

export default new VueRouter({

 routes : [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component : Login
  },
  {
    path: '/register',
    name: 'register',
    component : Register
  },
  {
    path: '/article/:article-slug',
    name: 'article',
    component : Article
  },
  {
    path: '/:username',
    name: 'profile',
    component : Profile
  },
  {
    path: '/editor',
    name: 'editor-edit',
    component : ArticleEdit
  },
  {
    path: '/settings',
    name: 'settings',
    component : Settings
  },
  {
    path: '/editor',
    name: 'editor_new',
    component : ArticleCreate
  },
 ]

});
