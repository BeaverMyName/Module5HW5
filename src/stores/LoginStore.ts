import { inject, injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";
import ownTypes from "../ioc/ownTypes";
import type AuthenticationService from "../services/AuthenticationService";

@injectable()
export default class LoginStore {

    @observable email = '';
    @observable password = '';
    @observable isLoading = false;
    @observable error = '';
    @observable token = '';

    constructor(   
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService
   ) {
       makeObservable(this);
   }

    @action
    public login = async () => {
        this.token = '';
        this.error = '';
        try {
            this.isLoading = true;
            const result = await this.authenticationService.login(this.email, this.password);
            runInAction(()=> {           
                 this.token = result.token;
            });
            
          } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
          }
          runInAction(()=> {
            this.isLoading = false;
        });
    }

    @action
    public changeEmail = (email: string) : void => {
      this.email = email;
    }

    @action
    public changePassword = (password: string) : void => {
      this.password = password;
    }
}
