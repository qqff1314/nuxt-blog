export const state = () => ({
    articleList: [],
    articlePage: 1,
    articleTotal: 0,
    articleLimit: 18
  });
  
  export const mutations = {
    setArticleList(state, data) { // 设置文章列表
      state.articleList = data;
    },
    setArticleTotal(state, number) {
      state.articleTotal = number;
    },
    setArticlePage(state, number) { // 设置文章页码
      state.articlePage = number;
    }
  };