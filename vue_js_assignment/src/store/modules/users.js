import { api, setToken, clearToken } from "../api";

export default {
    namespaced : true,
    state: {
        user: null,
        profile: null,
        feed : [],
        count: 0
    },
    getters: {
        username(state){
            return (state.user && state.user.username) || null;
        }
    },
    mutations: {
        setUser(state,payload) {
            state.user =payload;
        },
        setArticles(state,{articles, articlesCount}) {
            state.feed = articles;
            state.count= articlesCount;
        }
    },
    actions: {
        getUser: async function({commit}) {
            const user = await api.get("/user");
            commit("setUser",user);
        },
        loginUser: async function({commit}, {email,password}){
            clearToken();
            try{
                const response = await api.post("/users/login", {
                    user: {
                        email,
                        password
                    }
                });
            
            if(response.data.user)
            {
                setToken(response.data.user.token);
                commit("setUser",response.data.user);
                localStorage.setItem('jwt_token',response.data.user.token);
            }
            }catch(e){
                console.error(e);
                throw e;
            }
        },
        registerUser: async function({commit}, {username,email,password}){
           
            const response = await api.post("/users", {
                user: {
                    username,
                    email,
                    password
                }
            });

            if(response.data.user)
            {
              commit("setUser",response.data.user);
            }
        },
        async getGlobalFeed({commit}, payload = {page: 1}){
            let route = "/articles";
            if(payload){
                const {
                    tag=null,
                    author =null,
                    favourited=null,
                    page=1
                } = payload;
                route += tag ? `?tag=${tag}&` : "";
                route += author ? `?author=${author}&` : "";
                route += favourited ? `?favourited=${favourited}&` : "";
                route += page ? `?offset=${(page-1) * 10}&limit=10` : "";
            }
            const response = await api.get(route);
            commit("setArticles", response.data);
        },
        async getUserFeed({commit}, payload = {page: 1}){
            let route = "/articles/feed";
            if(payload){
                const {page = 1} = payload;
                route += page ? `?offset=${(page-1) * 10}&limit=10` : "";
            }
            const response = await api.get(route);
            commit("setArticles", response.data);
        },
       
        publishArticle: async function({commit}, {title,description,body}){
                 try{
                     const response = await api.post("/articles", {
                         article: {
                             title,
                             description,
                             body
                         }
                     });
                
                 if(response.data.article)
                 {
                     commit("getArticle",response.data.article);
                 }
                 }catch(e){
                     console.error(e);
                     throw e;
                 }
             },
             updateSetting: async function({commit}, {image,username,bio,email,password}){
                try{
                    const response = await api.put("/user", {
                            image,
                            password,
                            bio,
                            email,
                            username
                    });
               
                if(response.data.user)
                {
                    commit("setUser",response.data.user);
                }
                }catch(e){
                    console.error(e);
                    throw e;
                }
            },
      
    }
}
