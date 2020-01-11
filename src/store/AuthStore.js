import {observable} from 'mobx';
class AuthStore{
    @observable username = "furkan";
}
export default new AuthStore();