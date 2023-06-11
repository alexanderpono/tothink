import { TariffDto } from "./TariffDto";

export class TariffRepository {
    public async getTariffs(): Promise<TariffDto[]> {
        const response = await fetch("http://localhost:4000/api/tariffs");
        const objects: object[] = await response.json();
        return objects.map((object: object) => {
            return new TariffDto().fromJSON(object); // добавляем десериализацию
        });
    }
}
