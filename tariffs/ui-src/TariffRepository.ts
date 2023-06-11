import { TariffDto } from "./TariffDto";

export class TariffRepository {
    public async getTariffs(): Promise<TariffDto[]> {
        const response = await fetch("http://localhost:4000/api/tariffs");
        return await response.json();
    }
}
