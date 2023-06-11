import "reflect-metadata"
import { Serializable, jsonProperty } from "ts-serializable";

export class TariffDto extends Serializable {
    @jsonProperty(Number, null)
    public ageFrom: number = 0;

    @jsonProperty(Number, null)
    public ageTo: number = 0;
    
    @jsonProperty(Number, null)
    public price: number = 0;
}
