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
    @observable firstName = '';
    @observable lastName = '';
    @observable username = '';
    @observable phone = '';
    @observable gender = '';
    @observable birthday = '';

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

    @action
    public changePhoneNumber = (phone: string) => {
        this.phone = phone;
    }

    @action
    public changeFirstName = (firstName: string) => {
        this.firstName = firstName;
    }

    @action
    public changeLastName = (lastName: string) => {
        this.lastName = lastName;
    }

    @action
    public changeGender = (gender: string) => {
        this.gender = gender;
    }

    @action
    public changeBirthday = (birthday: string) => {
        this.birthday = birthday;
    }

    @action
    public changeUsername = (username: string) => {
        this.username = username;
    }

    private CheckValidation() : boolean {
        const regexp = /^[a-z ,.'-]+$/i;
        if (this.password !== this.passwordConfirmation) {
            this.error = t.passwordConfirmError;
        }
        else if (!regexp.test(this.firstName) || !regexp.test(this.lastName) || this.firstName.length > 50 || this.lastName.length > 50) {
            this.error = t.nameError;
        }
        else if (this.username.length < 8) {
            this.error = t.userNameLengthError;
        }

        return this.error.length === 0;
    }
}