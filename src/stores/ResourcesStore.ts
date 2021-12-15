import { injectable, inject } from 'inversify';
import { makeObservable, observable, action, runInAction } from 'mobx';
import ownTypes from '../ioc/ownTypes';
import type ResourceService from '../services/ResourceServise';
import type { Resource } from '../models/Resource';

@injectable()
export default class ResourcesStore {
    @observable resources: Resource[] = [];
    @observable isLoading = false;
    @observable currentPage = 1;
    @observable totalPages = 0;

    constructor(
        @inject(ownTypes.resourceService) private readonly resourceService : ResourceService
    ) {
        makeObservable(this);
    }

    @action
    public init = async () => {
        this.getByPage(this.currentPage);
    }

    @action
    public changePage = async (page: number) => {
        this.currentPage = page;
        this.getByPage(page);
    }

    private async getByPage(page: number) {
        try {
            this.isLoading = true;
            const result = await this.resourceService.getByPage(page);
            runInAction(() => {
                this.resources = result.data;
                this.totalPages = result.total_pages;
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
        runInAction(() => {
            this.isLoading = false;
        });
    }
}