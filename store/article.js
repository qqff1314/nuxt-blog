export const state = () => ({
    articleList: [],
    articlePage: 1,
    articleLimit: 20,
    articleTotal:0,
    articleScroll:0
    
  });

  export const mutations = {
    setArticleList(state, data) { // 设置文章列表
      state.articleList = data;
    },
    setArticleTotal(state, data) { // 设置文章总数
      state.articleTotal = data;
    },
    setArticlePage(state, data) { // 设置文章页码
      state.articlePage = data;
    },
    setArticleScroll(state, data) { // 设置滚动位置
      state.articleScroll = data;
    }
  };
