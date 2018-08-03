import Vue from 'vue'
import {Button,Pagination,Dialog,Input,Container,Header,Menu,MenuItem,Row,Col,Message,Popover} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
Vue.component(Button.name, Button);
Vue.component(Pagination.name, Pagination);
Vue.component(Dialog.name, Dialog);
Vue.component(Input.name, Input);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Popover.name, Popover);
Vue.prototype.$message = Message;




