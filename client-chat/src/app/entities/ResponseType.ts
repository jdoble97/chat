import { Message } from "./message";
import { ResponseEnum } from "./ResponseEnum";

export interface ResponseType{
    type: number;
    data: string;
    self_user?: boolean;
}