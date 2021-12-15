import { inject, injectable } from 'inversify';
import { observable, action, runInAction, makeObservable } from 'mobx';
import ownTypes from '../ioc/ownTypes';
import type RegisterService from '../services/RegisterService'
import t from '../locales/en/register.json'



@injectable()
export default class RegisterStore {
    @observable email = '';
    @observable password = '';
    @observable passwordConfirmation = '';
    @observable isLoading = false;
    @observable token = '';
    @observable error = '';

    public constructor(
        @inject(ownTypes.registerService) private readonly registerService : RegisterService
    ) {
        makeObservable(this);
    }

    @action
    public register = async () => {
        this.error = '';
        this.token = '';
        try {
            if (!this.CheckValidation()){
                return;
            }
            this.isLoading = true;
            const result = await this.registerService.register(this.email, this.password);
            runInAction(() => {
                this.token = result.token;
            });
        } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
        }
        runInAction(() => {
            this.isLoading = false;
        });
    }

    @action
    public changeEmail = (email: string) => {
        this.email = email;
    }

    @action
    public changePassword = (password: string) => {
        this.password = password;
    }

    @action
    public changePasswordConfirmation = (passwordConfirmation: string) => {
        this.passwordConfirmation = passwordConfirmation;
    }

    private CheckValidation() : boolean {
        if (this.password !== this.passwordConfirmation) {
            this.error = t.passwordConfirmError;
            return false;
        }

        return true;
    }
}