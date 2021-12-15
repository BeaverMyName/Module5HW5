import { ResourceDto } from './ResourceDto';

export interface ResourcesDto {
    data: ResourceDto[],
    total_pages: number
}