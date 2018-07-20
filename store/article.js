export const state = () => ({
    articleList: [],
    articlePage: 1,
    articleTotal: 0,
    articleLimit: 18,
    articleClassId:''
  });

  export const mutations = {
    setArticleList(state, data) { // 设置文章列表
      state.articleList = data;
    },
    setClassId(state, data) { // 设置文章分类
      state.articleClassId = data;
    },
    setArticleTotal(state, number) {
      state.articleTotal = number;
    },
    setArticlePage(state, number) { // 设置文章页码
      state.articlePage = number;
    }
  };
