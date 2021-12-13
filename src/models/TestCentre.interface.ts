import { Address } from './Address.interface';

export interface TestCentre {
    "vtsSite": string,
    "name": string,
    "address": Address,
    "classes": number[]
}
