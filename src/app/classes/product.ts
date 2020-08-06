import { Bubble } from "./bubble";

export class Product {
    ID: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
    bubbles: Bubble[];
}