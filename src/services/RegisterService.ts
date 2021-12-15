import 'reflect-metadata';
import type { RegisterResponse } from '../dtos/RegisterResponse';
import { injectable, inject } from 'inversify';
import HttpService from '../services/HttpService';
import ownTypes from '../ioc/ownTypes';
import { ContentType, MethodType } from '../services/HttpService';

export interface RegisterService {
    register(email: string, password: string): Promise<RegisterResponse>;
}

@injectable()
export default class DefaultRegisterService implements RegisterService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService : HttpService
    ) {
    }
    
    public async register(email: string, password: string): Promise<RegisterResponse> {
        const headers = { contentType: ContentType.Json };
        const data = { email, password };
        const result = await this.httpService.send<RegisterResponse>(`register`, MethodType.POST, headers, data);
        return result.data;
    }
}